import {React, useState} from 'react';
import FriendCard from './components/FriendCard';
import Wrapper from './components/Wrapper';
import Title from './components/Title';
import friendData from './friends.json';

function App() {
  const [ friends, setFriends ] = useState(friendData);

  function removeFriends(id) {
    const newFriends = friends.filter((friend) => friend.id !==id)
    setFriends(newFriends);
  }
  return (
    <Wrapper>
      <Title>Friends List</Title>
      {friends.map(f => (
      <FriendCard
        name={f.name}
        image={f.image}
        occupation={f.occupation}
        location={f.location}
        myRemoveFriend={() => removeFriends(f.id)}
      />
      ))}
    </Wrapper>
  );
}

export default App;
