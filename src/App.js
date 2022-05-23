import { Component} from 'react';
import './App.css';
import CardList from './Components/card-list/card-list.component';
import SearchBox from './Components/search-box/search-box.component';

class App extends Component {
  constructor(){
    super();
    this.state = {
      monsters : [],
      searchField : "", //its a string of search input ---> empty on the start
      data: null,
    };
  }

  componentDidMount(){
    fetch ('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => this.setState(() => {
      return { monsters: users };
    }))
    .catch( error => console.log('I have failed'));
    
    this.callBackendAPI()
    .then(res => this.setState({ data: res.express }))
    .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };


  onSearchChange = (event) =>{
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField }//its the same like - { searchField : searchField}
    });
  }

  
  render(){
    const { onSearchChange } = this;
    const { monsters, searchField ,data} = this.state; 
    //a new array for monsters after filtering
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox
          className='monsters-search-box' 
          placeholder='Search monsters' 
          onChangeHandler={onSearchChange}
        />
        {/* monsters - is a call back to my filteredMonsters array that i pass to child component */}
       <CardList monsters = { filteredMonsters }/>
       <p>{data}</p>
      </div>
    );
  }
}


export default App;
