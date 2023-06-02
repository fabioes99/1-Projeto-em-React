import Header from "../../components/Header";
import background from "../../assets/GitFind.png"
import ItemList  from "../../components/ItemList"
import { useState } from "react";
import './styles.css'

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setcurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async function(){
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();


    if(newUser.name){
      const {avatar_url, name , bio, login} = newUser;
      setcurrentUser({avatar_url, name , bio, login});


      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepo = await reposData.json();

      if(newRepo.length){
        setRepos(newRepo);
      }
      console.log(newRepo);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleGetData(); 
    }
  };

  return (
    <div className="App">
     <Header />
     <div className="conteudo">
      <img src={background} className="background" alt=" background app" />
      <div className="info">
       <div>
        <input 
        name="usuario" 
        value={user} 
        onChange={ event => setUser(event.target.value) }  
        placeholder="@username" 
        onKeyDown={handleKeyDown}
        />
        <button onClick={handleGetData}  style={{ cursor: 'pointer' }} >Buscar</button>
       </div>
       {currentUser?.name ? (
        <>
        <div className="perfil">
        <img src={currentUser.avatar_url} className="profile" alt="profile" />
          <div>
            <h3>{currentUser.name}</h3>
            <span>@{currentUser.login}</span>
            <p>{currentUser.bio}</p>
          </div>
       </div>
        <hr />

        <div>
        <h4 className="repositorio">Repositorios</h4>
        {repos?.length ? (
           repos.map( repo => (
            <ItemList key={repo.id} title={repo.name} description={repo.description} />
          ) ) 
        ) : null }
         </div>
        </>
        
       ) : null}
       
      </div>
     </div>
    </div>
  );
}

export default App;
