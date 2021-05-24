import { useState } from 'react'; 
import { gql } from '@apollo/client'; 
import { ApolloProvider } from '@apollo/client/react'; 
import { useQuery } from '@apollo/client'; 

const EXCHANGE_RATES = gql`
	query GetExchangeRates($currency: String!) {
		rates(currency: $currency) {
			rate 
		}
	}
`; 

const RATES = gql`
	query GetExchangeRates {
		rates(currency: "USD"){
			currency 
		}
	}
`; 


function Rates({onRateSelected}) {
	const { loading, error, data } = useQuery(RATES); 

	  if (loading) return <p> LOADING </p>; 
	  if (error) return <p> ERROR: {error} </p>; 
	
	  return (
		 <div className="App">
		 <select name="rate" onChange={onRateSelected}> 
			{
				data.rates.map(({currency, rate}) => (
				<option key={currency} value={rate}> 
					{currency}
				</option> 
				))
			}
		</select> 
		</div>
  );	
}

function ShowRate({currency}){
	const { loading, error, data } = useQuery(EXCHANGE_RATES, {
		variables: { currency }, 
	}); 

	console.log(data);

	if (loading) return null; 
	if (error) return `Error! ${error}`; 

	return (
		<div> 
			<h1> Rates Result: </h1>
			<h1>
				{
					data
				} 
			</h1>	
		</div>
	);
}

function App() {
  const [selectedCurrency, setSelectedCurrency] = useState(null); 

  function onCurrencySelected({target}) {
	console.log(target.value);
	setSelectedCurrency(target.value); 
  }

  return (
	 <div className="App">
		{selectedCurrency && <ShowRate currency={selectedCurrency} />}
		<Rates onRateSelected={onCurrencySelected} />
	</div>
  );
}

export default App;
