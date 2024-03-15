import {useEffect , useState } from 'react'
import './App.css'
import { Button, Modal } from 'flowbite-react';
import { Spinner } from 'flowbite-react';
import CardComponent from './components/CardComponent';
import FormCreateProduct from './components/FormCreateProduct';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';

type Status = 'idle' | 'loading' | 'success' | 'error'
type products = {
  readonly id: number,
  title: string,
  price: string,
  description: string,
  category: string,
  image: string
}

function App() {
  const [products , setProducts] = useState<products[]>([])
  const [status , setStatus] = useState<Status>('idle')
  const [openModal, setOpenModal] = useState(false);
  const [dataForm, setDataForm] = useState({});

  useEffect(() => {
    setStatus("loading")
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
      setProducts(data)
      setStatus("success")
    }).catch(err => {
      setStatus("error")
    })
  },[])

  if(status === "loading") {
    return (
      <div className="w-screen text-center">
      <Spinner aria-label="Center-aligned spinner example" size="xl"/>
    </div>
    )
  }

  function getDataForm( products:any ){
      setDataForm(products);
  }

  const createProduct = () => {
    fetch('https://fakestoreapi.com/products',{
      method: "POST",
      body: JSON.stringify(dataForm),
      headers: {
        "Content-type" : "application/json;",
      },
    }).then((res) => 
      res.json()).then((data) => {
        console.log("Create Product Successfully")
        console.log(data);
      }).catch((err) => {
        console.log(err);
      })
      setOpenModal(false);
  }

  console.log(status)
  return (
    <>
    <NavbarComponent></NavbarComponent>
      <div className="flex justify-center items-center my-5">
        <Button onClick={() => setOpenModal(true)}>Create product</Button>
      </div>
      <div className="grid grid-flow-row xl:grid-cols-4 md:grid-cols-2 sm:grid-col-1 gap-4">
        {products.map((products) => (
          <CardComponent 
              key={products.id}
              title={products.title}
              image={products.image}
              price={products.price}
          />
        ))}
      </div>
      <FooterComponent></FooterComponent>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create product</Modal.Header>
        <Modal.Body>
          <div className="space-y-5">
            <FormCreateProduct getDataForm={getDataForm}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => createProduct()}>Create</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default App
