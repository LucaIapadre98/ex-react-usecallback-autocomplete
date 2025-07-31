const debounce = (callback, delay) =>{
  let timeout;
  return (value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback (value);
    }, delay);
  };
};

import { useState, useEffect, useCallback } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);


  const fectchProducts = async (query) => {
    if(!query.trim()){
      setSuggestions([]);
      return;
    }
    try {
      const response = await  fetch(`http://freetestapi.com/api/v1/products?search=${query}`)
      const data = await response.json ();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  const debouncedFetchProducts = useCallback(debounce(fectchProducts, 500), []);

  useEffect(() => {
    debouncedFetchProducts(query);
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

// Attualmente, ogni pressione di tasto esegue una richiesta API. 
// Questo è inefficiente!
// Implementa una funzione di debounce per ritardare la chiamata API 
// fino a quando l’utente smette di digitare per un breve periodo (es. 300ms)
// Dopo l’implementazione, verifica che la ricerca non venga eseguita immediatamente a ogni tasto premuto, ma solo dopo una breve pausa.
// Obiettivo: Ridurre il numero di richieste API e migliorare le prestazioni.