import { useState, useEffect } from "react";
import Formulario from "./components/Formulario"
import ListaCompras from "./components/ListaCompras"

const intialStateItems = [];

function App() {

	const[items, setItems] = useState(intialStateItems);
	const [showModal, setShowModal] = useState(false);
	const BACKEND = import.meta.env.VITE_BACKEND_URL;

	const fetchItems = async () => {
		try {
		  const response = await fetch(`${BACKEND}/Item/`);
		  const data = await response.json();
		  setItems(data);
		} catch (error) {
		  console.error('Error fetching data:', error);
		}
	  };

	useEffect(() => {
		fetchItems();
	}, []);

	const addItem = (item) => {
		setItems([...items, item])
	}

	const handleSaveChanges = async (dataL) => {
		const id = dataL.id;
		try {
		  const response = await fetch(`${BACKEND}/Item/${id}`, {
			method: 'PUT',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(dataL)
		  });
	
		  if (response.ok) {
			const result = await response.json();
			console.log('Data saved successfully:', result);
			setItems(items.map(item => item.id === result.id ? result : item));
			setShowModal(false); // Close modal after successful save
	
		  } else {
			console.error('Error saving data:', response.statusText);
		  }
		} catch (error) {
		  console.error('Error:', error);
		}
	};

	const deleteItem = async (id) => {
		try {
			const response = await fetch(`${BACKEND}/Item/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				const result = await response.json();
				console.log('Data deleted successfully:', result);
				fetchItems();
		
			} else {
				console.error('Error saving data:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	const handleOpenModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	return (
		<div className="container">
		<h1 className="my-3">Lista de Compras</h1>
		<Formulario addItem={addItem} />
		<ListaCompras
			items={items}
			handleSaveChanges={handleSaveChanges}
			showModal={showModal}
			handleOpenModal={handleOpenModal}
			handleCloseModal={handleCloseModal}
			deleteItem={deleteItem}
		/>
		</div>
	)
}

export default App
