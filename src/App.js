import { useState } from 'react'; 
import { gql } from '@apollo/client'; 
import { ApolloProvider } from '@apollo/client/react'; 
import { useQuery } from '@apollo/client'; 

const GET_DOGS = gql`
	{
		dogs {
			id 
			breed 
		}
	}
`; 

const GET_DOG_PHOTO = gql`
	query dog($breed: String!) {
		dog(breed: $breed) {
			id 
			displayImage 
		}
	}
`; 


function Dogs({onDogSelected}) {
	const { loading, error, data } = useQuery(GET_DOGS); 

	  if (loading) return <p> LOADING </p>; 
	  if (error) return <p> ERROR: {error} </p>; 
	
	  return (
		 <div className="App">
		 <select name="dog" onChange={onDogSelected}> 
			{
				data.dogs.map(dog => (
				<option key={dog.id} value={dog.breed}> 
					{dog.breed}
				</option> 
				))
			}
		</select> 
		</div>
  );	
}

function ShowDog({breed}){
	const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
		variables: { breed }, 
		pollInterval: 500 //query will execute periodically at the given interval
	}); 

	console.log(data);

	if (loading) return null; 
	if (error) return `Error! ${error}`; 

	return (
		<div> 
			<img src={data.dog.displayImage} /> 
		</div>
	);
}

function App() {
  const [selectedDog, setSelectedDog] = useState(null); 

  function onDogSelected({target}) {
	console.log(target.value);
	setSelectedDog(target.value); 
  }

  return (
	 <div className="App">
		{selectedDog && <ShowDog breed={selectedDog} />}
		<Dogs onDogSelected={onDogSelected} />
	</div>
  );
}

export default App;
