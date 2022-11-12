// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract EmissionTracker{

    address public immutable government;
    // uint immutable CONTROL_NUM;

    constructor(){
        government = msg.sender;
    }

    struct Checkers{
        address checker;
        uint emission;
    }

    struct suspiciousEmission{
        address tracker;
        uint companyId;
        address[] checkers;
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

    event SuspiciousEmission(
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
    mapping (address => mapping(uint => suspiciousEmission)) suspiciousEmissions;

    //[reporter][timestamp]

    modifier byGovernment{
        require(msg.sender == government, "Only government can add tracker");
        _;
    }

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
        uint[] calldata companyIds_,
        uint[] calldata emissions_)
    external {
        require(trackers[msg.sender] > 0, "Only Authorized trackers can update emissions");
        uint i = 0;
        uint len = companyIds_.length;
        require(len == emissions_.length, "Inputs must be same length");
        while (i < len){
            emissions[msg.sender][companyIds_[i]] = emissions_[i];
            emit EmissionUpdated(msg.sender, companyIds_[i], emissions_[i]);
            unchecked {i++;}
        }
    }


}
