//  Premessa: Stai sviluppando un campo di ricerca intelligente simile a quello di Amazon. 
//  Quando l'utente digita, una tendina di suggerimenti mostra i prodotti corrispondenti alla ricerca. 
//  Per evitare richieste API eccessive, devi ottimizzare la ricerca con il debounce.

// Crea un campo di input (<input type="text">) in cui l’utente può digitare.

// Effettua una chiamata API a: 
// /products?search=[query]

// La query deve essere sostituita con il testo digitato.
// Mostra i risultati API sotto l'input in una tendina di suggerimenti.

// Se l'utente cancella il testo, la tendina scompare.


// Obiettivo: Mostrare suggerimenti dinamici in base alla ricerca dell'utente.

import { useState, useEffect } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  

  useEffect(() => {
    if(!query.trim()){
      setSuggestions([]);
      return;
    }

    fetch(`http://freetestapi.com/api/v1/products?search=${query}`)
      .then(res => res.json())
      .then(data => setSuggestions(data))
      .catch(err => console.error('Error fetching products:', err));
  }, [query]);

  return (
    <div>
      <input 
      type='text'
      placeholder='Cerca prodotti...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ></input>
      {suggestions.length > 0 && (
        <div className='dropdown'>
          {suggestions.map((product) => (
            <p key={product.id}>{product.name}</p>
          ))}
        </div>
      )}
    </div>
  )
};

export default App;
