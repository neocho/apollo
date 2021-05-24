import { useState } from 'react'; 
import { gql } from '@apollo/client'; 
import { ApolloProvider } from '@apollo/client/react'; 
import { useQuery } from '@apollo/client'; 

//const GET_DOGS = gql`
//	{
//		dogs {
//			id 
//			breed 
//		}
//	}
//`; 
//
//const GET_DOG_PHOTO = gql`
//	query dog($breed: String!) {
//		dog(breed: $breed) {
//			id 
//			displayImage 
//		}
//	}
//`; 


const GET_UNISWAP_DATA = gql`
	{
		pairs(first: 10, where: {reserveUSD_gt: "1000000", volumeUSD_gt: "50000"}, orderBy: reserveUSD, orderDirection:desc){
			id
			token0 {
				id
				symbol
			}
			token1 {
				id
				symbol
			}
			reserveUSD
			volumeUSD
		}
	}
`; 


//function Dogs({onDogSelected}) {
//	const { loading, error, data } = useQuery(GET_DOGS); 
//
//	  if (loading) return <p> LOADING </p>; 
//	  if (error) return <p> ERROR: {error} </p>; 
//	
//	  return (
//		 <div className="App">
//		 <select name="dog" onChange={onDogSelected}> 
//			{
//				data.dogs.map(dog => (
//				<option key={dog.id} value={dog.breed}> 
//					{dog.breed}
//				</option> 
//				))
//			}
//		</select> 
//		</div>
//  );	
//}

//function ShowDog({breed}){
//	const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
//		variables: { breed }, 
//		pollInterval: 500 //query will execute periodically at the given interval
//	}); 
//
//	console.log(data);
//
//	if (loading) return null; 
//	if (error) return `Error! ${error}`; 
//
//	return (
//		<div> 
//			<img src={data.dog.displayImage} /> 
//		</div>
//	);
//}

function Uniswap(){
	const { loading, error, data } = useQuery(GET_UNISWAP_DATA, {pollInterval: 500}); 

	if (loading) return <p> LOADING </p>; 
    if (error) return <p> ERROR </p>; 
	
	return(
		<div> 
			{
				data.pairs.map((token, idx) => (
					<h3 key={idx} > 
						{token.token0.symbol}:{token.token0.id} <br/>
						{token.token1.symbol}:{token.token1.id} <br/>
						reserve USD:{token.reserveUSD} <br/>
						volume USD{token.volumeUSD}
					</h3>
				))
			}	
		</div>
	);

}

function App() {
 // const [selectedDog, setSelectedDog] = useState(null); 

//  function onDogSelected({target}) {
//	console.log(target.value);
//	setSelectedDog(target.value); 
//  }

  return (
	 <div className="App">
	 <h1> UNISWAP Pairs</h1>
	 <Uniswap />
	</div>
  );
}

export default App;
