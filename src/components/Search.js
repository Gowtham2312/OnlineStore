import { useState, useEffect } from 'react'
import { GoSearch } from 'react-icons/go'
import { useHistory } from 'react-router';
import axios from 'axios'

export default function Search() {

  let history = useHistory()

  let [products, setProduct] = useState([])

  const [searchField, setSearchField] = useState("");

  const handleChange = e => {

    setSearchField(e.target.value);
    
  };
  if(products.length != 0){
    var items =  products.filter((prod,ind)=> prod.forsearch.includes(searchField.toLowerCase()))
  }

  function Search() {

    let daata = searchField
    history.push(`/singleproduct/${daata}`)

  }

  //drop-down on search bar
  function gotoProdDisplay(prodname) {

    let daata = prodname
    history.push(`/singleproduct/${daata}`)

  }

  useEffect(async () => {
    let response = await axios.get("/products/get-products")
    let allproducts = response.data;
    setProduct([...allproducts.payload])
  }, [])

  return (
    <div className="d-block mt-2">
          <form class="d-flex mt-2 me-5">
            <input class="ms-2" type="search" placeholder="Search for Products" aria-label="Search" onChange={handleChange} />
            <button class="btn btn-success" type="submit" onClick={Search}><GoSearch /></button>
          </form>
          {
            (products.length != 0) && 
                  items.map((item)=>{
                    return(
                      (searchField[2] === item.forsearch[2]) &&
                      <div className="text-dark p-1 pointer" onClick={()=>gotoProdDisplay(item.forsearch)}>{item.productName}</div>
                    )
                  })                       
          }
        </div>
  )
}
