// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract EmissionTracker{

    address public immutable government;
    uint public VALUE_FOR_NOTIFICATION;
    uint public DEVIATION_PERCENTAGE;
    uint public NOTIFIER_SHARE;

    constructor(uint vfn, uint dp, uint ns){
        government = msg.sender;
        VALUE_FOR_NOTIFICATION = vfn;
        DEVIATION_PERCENTAGE = dp;
        NOTIFIER_SHARE = ns;
    }

    modifier byGovernment{
        require(msg.sender == government, "Only government can add tracker");
        _;
    }

    struct Checkers{
        address checker;
        uint emission;
    }

    struct SuspiciousEmission{
        address tracker;
        uint emissionPointId;
        address[] checkers;
        uint totalCheckedEmission;
        uint checkedNum;
    }

    event TrackerStatus(
        address indexed tracker,
        bool isTracker
    );

    event EmissionUpdated(
        address indexed tracker,
        uint indexed emissionPointId,
        uint emission
    );

    event SuspectedEmission(
        address indexed tracker,
        uint indexed emissionPointId
    );

    event CheckerDesignated(
        address indexed notifier,
        uint indexed timestamp,
        address indexed checker
    );

    
    mapping (address => uint) trackers; //points
    mapping (address => mapping(uint => uint)) emissions; //daily basis
    mapping (address => mapping(uint => SuspiciousEmission)) suspiciousEmissions;
    //[notifier][blockNumber]

    function addTracker(
        address[] calldata trackers_
    )
    external byGovernment{
        uint i = 0;
        uint len = trackers_.length;
        while (i < len){
            trackers[trackers_[i]] = 1; //initilize point
            emit TrackerStatus(trackers_[i], true);
            unchecked {i++;}
        }
        
    }

    function removeTracker(
        address[] calldata trackers_
    )
    external byGovernment{
        uint i = 0;
        uint len = trackers_.length;
        while (i < len){
            trackers[trackers_[i]] = 0; //initilize point
            emit TrackerStatus(trackers_[i], false);
            unchecked {i++;}
        }
        
    }

    function designateCheckers(
        address[] calldata checkers_,
        address notifier_,
        uint timestamp_
    )
    external byGovernment{
        uint i = 0;
        uint len = checkers_.length;
        while (i < len){
            suspiciousEmissions[notifier_][timestamp_].checkers.push(checkers_[i]);
            emit CheckerDesignated(notifier_, timestamp_, checkers_[i]);
            unchecked {i++;}
        }
    }

    function updateEmissions(
        uint[] calldata emissionPointIds_,
        uint[] calldata emissions_)
    external {
        require(trackers[msg.sender] > 0, "Only Authorized trackers can update emissions");
        uint i = 0;
        uint len = emissionPointIds_.length;
        require(len == emissions_.length, "Inputs must be same length");
        while (i < len){
            emissions[msg.sender][emissionPointIds_[i]] = emissions_[i];
            emit EmissionUpdated(msg.sender, emissionPointIds_[i], emissions_[i]);
            unchecked {i++;}
        }
    }

    function notifySuspiciousEmission(
        address tracker_,
        uint emissionPointId_
    ) external payable {
        // notifier and tracker has some point to give checkers
        require( trackers[msg.sender] > VALUE_FOR_NOTIFICATION &&
            trackers[tracker_] > VALUE_FOR_NOTIFICATION);
        SuspiciousEmission storage s = suspiciousEmissions[msg.sender][block.number];
        s.tracker = tracker_;
        s.emissionPointId = emissionPointId_;
        emit SuspectedEmission(tracker_, emissionPointId_);
    }


    function checkEmission(
        address notifier_,
        uint blocknum_,
        uint emission_
    ) external {
        SuspiciousEmission memory s = suspiciousEmissions[notifier_][blocknum_];
        uint i = 0;
        uint len = s.checkers.length;
        while (i < len){
            if(msg.sender == s.checkers[i]){ //if he/she has duty
                unchecked {
                    s.totalCheckedEmission += emission_; 
                    s.checkedNum ++;
                }
            }
            unchecked {i++;}
        }
        if(len == s.checkedNum) // if all designated checkers measured emission
            setCheckedEmission(notifier_, s.checkers, s.tracker, s.emissionPointId, s.totalCheckedEmission);
    }

    function setCheckedEmission(
        address notifier_,
        address[] memory checkers_,
        address tracker_,
        uint emissionPointId_,
        uint totalCheckedEmission_
    )internal {
        uint avarageEmission = totalCheckedEmission_ / checkers_.length;
        uint suspiciousEmission = emissions[tracker_][emissionPointId_];
 
        if( avarageEmission < suspiciousEmission * (100 - DEVIATION_PERCENTAGE)
        || avarageEmission > suspiciousEmission * (100 + DEVIATION_PERCENTAGE)){
            emissions[notifier_][emissionPointId_] = avarageEmission; // correct value
            if(trackers[tracker_] > VALUE_FOR_NOTIFICATION)
                trackers[tracker_] -= VALUE_FOR_NOTIFICATION;
            else
                trackers[tracker_] =1;
            
            // notifier share
            trackers[notifier_] += VALUE_FOR_NOTIFICATION * NOTIFIER_SHARE / 100;
        }
        else{
            if(trackers[notifier_] > VALUE_FOR_NOTIFICATION)
                trackers[notifier_] -= VALUE_FOR_NOTIFICATION;
            else
                trackers[notifier_] =1;
        }

        //checkers shares
        uint i = 0;
        uint len = checkers_.length;
        while (i < len){
            trackers[checkers_[i]] += VALUE_FOR_NOTIFICATION / len;
            unchecked {i++;}
        }
    }
}
