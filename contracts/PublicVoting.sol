// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";


contract PublicVoting is Ownable {

    struct Choice {
        string title ;
        uint8 count ;
    }
    
    struct Voter {
       mapping (address => bool) isVoted;
       mapping (address => string) votedTitle;
    }

   enum State { WAITING, VOTING, ENDED }

   struct VoteInfo {
       string  title ;
       address creator;
       State state ;
    }

    event NewVoting(address creator, uint id);

    uint private _runningId = 0 ;
    uint8 private _maxChoice = 10;
    mapping(uint => Choice[]) private _choiceStore;
    mapping(uint => Voter) private  _voterStore;
    mapping(uint => VoteInfo) private  _votingInfoStore;
    mapping(address => uint[]) private  _userHistory;

   modifier onlyCreator(uint _id) {
        require(_votingInfoStore[_id].creator == msg.sender , "Only creator of this vote");
        _;
    }

    modifier onlyVotingState(uint _id) {
        require(_votingInfoStore[_id].state == State.VOTING , "The vote is not in available state");
        _;
    }

    modifier onlyEndState(uint _id) {
        require(_votingInfoStore[_id].state == State.ENDED , "The vote is not in available state");
        _;
    }

    modifier onlyParticipant(uint _id) {
        require(_voterStore[_id].isVoted[msg.sender] == true || _votingInfoStore[_id].creator  == msg.sender , "Not participant in this voting");
        _;
    }

   function createNewVoting (string[] memory _choices , string memory title) public {
       require(_choices.length <= _maxChoice , 'Exceed choice');
        _runningId += 1;
       Choice[] storage tempChoice = _choiceStore[_runningId];
       for(uint i = 0 ; i < _choices.length ; i++){
           tempChoice.push(Choice({
               title : _choices[i],
               count : 0
           })) ;
        } 
        _userHistory[msg.sender].push(_runningId);
        _votingInfoStore[_runningId] = VoteInfo({
           title : title,
           creator : msg.sender ,
           state : State.WAITING
        });
        emit NewVoting(msg.sender, _runningId);
    }

    function sendVote(uint _id , uint _index) public onlyVotingState(_id) {
         require(_voterStore[_id].isVoted[msg.sender] == false, "Already vote");
         Choice[] storage tempChoice = _choiceStore[_id];
         _voterStore[_id].isVoted[msg.sender] = true;
         _voterStore[_id].votedTitle[msg.sender] = _choiceStore[_id][_index].title;
         _userHistory[msg.sender].push(_id);
         tempChoice[_index].count += 1;
    }

    function myVote(uint _id) public view returns(string memory){
       return _voterStore[_id].votedTitle[msg.sender];
    }

    function isVoted(uint _id) public view returns(bool){
       return _voterStore[_id].isVoted[msg.sender];
    }

   function votingInfo(uint _id) public view returns(VoteInfo memory){
       return _votingInfoStore[_id];
    }

    function voteHistory() public view returns(uint[] memory){
       return _userHistory[msg.sender];
    }

    function totalVote(uint _id) public view returns(uint) {
        uint response = 0 ;
        for(uint i = 0 ; i < _choiceStore[_id].length ; i++){
           response += _choiceStore[_id][i].count;
        }  
        return response;
    }

    function voteChoices(uint _id) public view returns(string[] memory){
       string[] memory response = new string[](_choiceStore[_id].length) ;
       for(uint i = 0 ; i < _choiceStore[_id].length ; i++){
           response[i] = _choiceStore[_id][i].title;
       }  
       return response;
    }

    function voteResult(uint _id) public onlyEndState(_id) onlyParticipant(_id) view returns(Choice[] memory){
       return _choiceStore[_id];
    }

   function openVote(uint _id) public  onlyCreator(_id){
       _votingInfoStore[_id].state = State.VOTING;
    }

   function endVote(uint _id) public  onlyCreator(_id){
       _votingInfoStore[_id].state = State.ENDED;
   }

   function editMaxChoice(uint8 _newMax) public onlyOwner {
      _maxChoice = _newMax;
   }

}