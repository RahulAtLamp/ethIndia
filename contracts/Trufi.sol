// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.15;

contract POC {

    struct Organization{
        string name;
        string details;
        uint price;
        uint percent;
    }

    struct Application{
        address userAddress;
        address orgAddress;
        string certificateUrl;
        uint price;
        bool status;
        uint appId;
        string loantype;
    }
    uint appId=0;

    address[] organization ;

    mapping (address =>Organization) public organizationdetails;

    mapping (uint => Application) ApplicationIdToApplication;

    mapping (address =>mapping(address=>bool)) userAppliedToOrg;
    
    mapping (address => uint[]) public organizationToUserMapping;

    mapping (address => uint[]) public userToAppIdMapping;

    function addOrganization(string memory _name, string memory _details, uint _price, uint _percent) public{
        require(keccak256(abi.encodePacked(organizationdetails[msg.sender].name)) == keccak256(abi.encodePacked("")),"You are already registered");
        organization.push(msg.sender);
        organizationdetails[msg.sender] = Organization(_name,_details, _price,_percent);
    }

    function getOrganization() public view returns(address[] memory)
    {
        return organization ;
    }

    function userApplyDetails(address _orgAddress, string memory certificateUrl,uint _price,string memory _loantype) public{

        require(userAppliedToOrg[msg.sender][_orgAddress]==false,"You have already applied");
        organizationToUserMapping[_orgAddress].push(appId);
        ApplicationIdToApplication[appId] =Application(msg.sender,_orgAddress,certificateUrl,_price,false,appId,_loantype);
        userAppliedToOrg[msg.sender][_orgAddress] = true;
        userToAppIdMapping[msg.sender].push(appId);
        appId = appId+1;
    }

    function getUsers(uint[] memory _appId)public view returns(Application[] memory)
    {
        Application[] memory ret = new Application[](_appId.length); 
        for(uint i =0;i<_appId.length;i++)
        {       
                ret[i] =(ApplicationIdToApplication[_appId[i]]);
        }
        return ret;
    }

    function getAppId()public view returns(uint256[] memory){

        return organizationToUserMapping[msg.sender];
    }

    function getAppIdforUser() public view returns(uint256[] memory)
    {
        return organizationToUserMapping[msg.sender];

    }
    function approveUser(uint _appId) public {
        require(ApplicationIdToApplication[_appId].status = true,"User Already Approved");
        ApplicationIdToApplication[_appId].status = true;
    }

    function withdrawRequest(uint _appId) public {
        ApplicationIdToApplication[_appId].status = false;
    }

    function getOrganizationDetails(address[] memory _userAddress) public view returns(Organization[] memory)
    {
        Organization[] memory ret = new Organization[](_userAddress.length); 
        for(uint i =0;i<_userAddress.length;i++)
        {       
                ret[i] =(organizationdetails[_userAddress[i]]);
        }
        return ret;
    }

}