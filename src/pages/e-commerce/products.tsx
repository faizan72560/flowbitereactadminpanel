/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  HiCog,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiPencilAlt,
  HiTrash,
  HiUpload,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Pagination } from "../users/list";

const EcommerceProductsPage: FC = function () {

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/e-commerce/products">
                E-commerce
              </Breadcrumb.Item>
              <Breadcrumb.Item>Products</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All products
            </h1>
          </div>
          <div className="block items-center sm:flex">
            {/* <SearchForProducts /> */}
            {/* <div className="hidden space-x-1 border-l border-gray-100 pl-2 dark:border-gray-700 md:flex">
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Configure</span>
                <HiCog className="text-2xl" />
              </a>
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Delete</span>
                <HiTrash className="text-2xl" />
              </a>
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Purge</span>
                <HiExclamationCircle className="text-2xl" />
              </a>
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Settings</span>
                <HiDotsVertical className="text-2xl" />
              </a>
            </div> */}
            <div className="flex w-full items-center sm:justify-end">
              <AddProductModal />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <ProductsTable />
            </div>
          </div>
        </div>
      </div>
      {/* <Pagination /> */}
    </NavbarSidebarLayout>
  );
};

const SearchForProducts: FC = function ({totalDataArr,setTotalDataArr,search,setSearch}) {

  // const [search,setSearch]=useState('')

  useEffect(() => {
    if (search?.length>0) {
      
      const regex = new RegExp(search, 'i'); 
  
      const filteredData = totalDataArr.filter(product => 
        regex.test(product.title)  
      
      );

      console.log(filteredData,"123445")
  
    
      setTotalDataArr(filteredData);
    } else {
     
      setTotalDataArr(totalDataArr);
    }
    
  }, [search]);  
  

  console.log(totalDataArr,"totalData")




  return (
    <form className="mb-4 sm:mb-0 sm:pr-3" action="#" method="GET">
      <Label htmlFor="Title search" className="sr-only">
        Search
      </Label>
      <div className="relative mt-1 lg:w-64 xl:w-96">
        <TextInput
          id="products-search"
          name="Title Search"
          placeholder="Search for products"
          value={search}
          onChange={(e)=>{setSearch(e.target.value)}}
        />
      </div>
    </form>
  );
};

const AddProductModal: FC = function () {
  const [isOpen, setOpen] = useState(false);

  const [data,setData]=useState({
    title:"",
    body:"",
    userId:"",
    id:""
  })

  console.log(data,"567")

  const addProduct=async()=>{

    if(data?.title.length==0|| data?.body?.length==0|| data?.userId?.length==0 || data?.id?.length==0){
      alert("fill the data")
      return
    }


    const response=await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    const data1=await response.json()
    console.log(data1,"9087")

    setData({
      title:"",
      body:"",
      userId:"",
      id:""
    })

    setOpen(false)
    alert("Product Added successfully")
      
  }

  return (
    <div>
      <Button color="primary" onClick={() => setOpen(!isOpen)}>
      
        <FaPlus className="mr-3 text-sm" />
        Add product
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Add product</strong>
        </Modal.Header>
        <Modal.Body>
        {/* <Button color="primary" onClick={() => setOpen(false)}>
            Close
          </Button> */}
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="productName">Title</Label>
                <TextInput
  id="productName"
  name="productName"
  placeholder='Title'
  className="mt-1"
  value={data?.title || ''} 
  onChange={(e) => {
    setData((prevData) => ({ ...prevData, title: e.target.value })); 
  }}
/>

              </div>
              <div>
                <Label htmlFor="category">Body</Label>
                <TextInput
                  id="category"
                  name="category"
                  placeholder="Body"
                  className="mt-1"
                  value={data?.body}
                  // value={data?.title}
                  onChange={(e) => {
                    setData((prevData) => ({ ...prevData, body: e.target.value })); 
                  }}
                />
              </div>
              <div>
                <Label htmlFor="brand">UserId</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder="UserId"
                  className="mt-1"
                  value={data?.userId}
                  // value={data?.title}
                  onChange={(e) => {
                    setData((prevData) => ({ ...prevData, userId: e.target.value })); 
                  }}
                />
              </div>
              <div>
                <Label htmlFor="brand">UserId</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder="Id"
                  className="mt-1"
                  value={data?.id}
                  // value={data?.title}
                  onChange={(e) => {
                    setData((prevData) => ({ ...prevData, id: e.target.value })); 
                  }}
                />
              </div>
              {/* <div>
                <Label htmlFor="price">Price</Label>
                <TextInput
                  id="price"
                  name="price"
                  type="number"
                  placeholder="$2300"
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="producTable.Celletails">Product details</Label>
                <Textarea
                  id="producTable.Celletails"
                  name="producTable.Celletails"
                  placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
                  rows={6}
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <div className="flex w-full items-center justify-center">
                  <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
                        Upload a file or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div> */}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={addProduct}>
            Add product
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const EditProductModal: FC = function ({data}) {
  const [isOpen, setOpen] = useState(false);

  const [updateData,setUpdateData]=useState(data)


  const updateHandler = async () => {
    try {

      if(updateData?.title.length==0|| updateData?.body?.length==0|| updateData?.userId?.length==0 || updateData?.id?.length==0){
        alert("fill the data")
        return
      }
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${data?.id}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
  
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
     
      const data1 = await response.json();
      console.log('Update successful:', data1);
      setOpen(false)
      alert("Update successfull")
      
    } catch (err) {
      console.error('Update failed:', err);
    }
  };
  


  console.log(updateData)

  return (
    <>
      <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <HiPencilAlt className="mr-2 text-lg" />
        Edit item
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Edit product</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="productName">Title</Label>
                <TextInput
                  id="productName"
                  name="productName"
                  placeholder='Apple iMac 27"'
                  className="mt-1"
                  value={updateData?.title}
                  onChange={(e) => {
                    setUpdateData((prevData) => ({ ...prevData, title: e.target.value })); 
                  }}
                />
              </div>
              <div>
                <Label htmlFor="category">Body</Label>
                <TextInput
                  id="category"
                  name="category"
                  placeholder="Electronics"
                  className="mt-1"
                  value={updateData?.body}
                  onChange={(e) => {
                    setUpdateData((prevData) => ({ ...prevData, body: e.target.value })); 
                  }}
                />
              </div>
              <div>
                <Label htmlFor="brand">User Id</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder="Apple"
                  className="mt-1"
                  value={updateData?.userId}
                  onChange={(e) => {
                    setUpdateData((prevData) => ({ ...prevData, userId: e.target.value })); 
                  }}
                />
              </div>
             
              {/* <div className="lg:col-span-2">
                <Label htmlFor="productDetails">Product details</Label>
                <Textarea
                  id="productDetails"
                  name="productDetails"
                  placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
                  rows={6}
                  className="mt-1"
                />
              </div> */}
              {/* <div className="flex space-x-5">
                <div>
                  <img
                    alt="Apple iMac 1"
                    src="/images/products/apple-imac-1.png"
                    className="h-24"
                  />
                  <a href="#" className="cursor-pointer">
                    <span className="sr-only">Delete</span>
                    <HiTrash className="-mt-5 text-2xl text-red-600" />
                  </a>
                </div>
                <div>
                  <img
                    alt="Apple iMac 2"
                    src="/images/products/apple-imac-2.png"
                    className="h-24"
                  />
                  <a href="#" className="cursor-pointer">
                    <span className="sr-only">Delete</span>
                    <HiTrash className="-mt-5 text-2xl text-red-600" />
                  </a>
                </div>
                <div>
                  <img
                    alt="Apple iMac 3"
                    src="/images/products/apple-imac-3.png"
                    className="h-24"
                  />
                  <a href="#" className="cursor-pointer">
                    <span className="sr-only">Delete</span>
                    <HiTrash className="-mt-5 text-2xl text-red-600" />
                  </a>
                </div>
              </div> */}
              {/* <div className="lg:col-span-2">
                <div className="flex w-full items-center justify-center">
                  <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
                        Upload a file or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div> */}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={updateHandler}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const DeleteProductModal: FC = function ({id}) {

  const [isOpen, setOpen] = useState(false);

  const deleteHandler = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the post');
      }
        setOpen(false)
      alert("deleted successfully")
  
      console.log('Post deleted successfully');
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <>
      <Button color="failure" onClick={() => setOpen(!isOpen)}>
        <HiTrash className="mr-2 text-lg" />
        Delete item
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="px-3 pt-3 pb-0">
          <span className="sr-only">Delete product</span>
        </Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-600" />
            <p className="text-lg text-gray-500 dark:text-gray-300">
              Are you sure you want to delete this product?
            </p>
            <div className="flex items-center gap-x-3">
              <Button color="failure" onClick={deleteHandler}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpen(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const ProductsTable: FC = function () {

  const [productData,setProductData]=useState([])
  const [page,setPage]=useState(1)
  const [totalData,setTotalData]=useState(0)
  const [totalDataArr,setTotalDataArr]=useState([])
  const [search,setSearch]=useState('')

  useEffect(()=>{
    if(search?.length==0)
    getData()

    

  },[page,search])

  const getData = async () => {
    try {
   
      let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "GET"
      });
      let data = await response.json(); 
      console.log(data);
      setTotalDataArr(data)
      setTotalData(data?.length)
      
      // setProductData(data)
      // let lastPostIndex=page*limit
      // let firstPostIndex=lastPostIndex-limit
      // setProductData(data?.slice(firstPostIndex,lastPostIndex))
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(()=>{
    let limit=20
    let lastPostIndex=page*limit
      let firstPostIndex=lastPostIndex-limit
      setProductData(totalDataArr?.slice(firstPostIndex,lastPostIndex))

  },[totalDataArr])

  // const SearchForProducts: FC = function () {
  //   console.log(totalDataArr,"12347")
  //   return (
  //     <form className="mb-4 sm:mb-0 sm:pr-3" action="#" method="GET">
  //       <Label htmlFor="products-search" className="sr-only">
  //         Search
  //       </Label>
  //       <div className="relative mt-1 lg:w-64 xl:w-96">
  //         <TextInput
  //           id="products-search"
  //           name="products-search"
  //           placeholder="Search for products"
  //         />
  //       </div>
  //     </form>
  //   );
  // };
  
  



  return (
    <>
    <div style={{marginTop:15,marginBottom:15}}>
<SearchForProducts totalDataArr={totalDataArr} setTotalDataArr={setTotalDataArr} search={search} setSearch={setSearch}/>
    </div>
   
    
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>
          <span className="sr-only">Toggle selected</span>
          <Checkbox />
        </Table.HeadCell>
        <Table.HeadCell>User Id</Table.HeadCell>
        <Table.HeadCell>Id</Table.HeadCell>
        <Table.HeadCell>Title</Table.HeadCell>
        <Table.HeadCell>Body</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {
          productData?.map((elem)=>{
            return(
        <Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700">
          <Table.Cell className="w-4 p-4">
            <Checkbox />
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
            <div className="text-base font-semibold text-gray-900 dark:text-white">
              {elem?.userId}
            </div>
            {/* <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Html templates
            </div> */}
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
            {elem?.id}
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
            {elem?.title?.slice(0,10)}
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
            {elem?.body?.slice(0,20)}
          </Table.Cell>
          <Table.Cell className="space-x-2 whitespace-nowrap p-4">
            <div className="flex items-center gap-x-3">
              <EditProductModal data={elem} />
              <DeleteProductModal  id={elem?.id} />
            </div>
          </Table.Cell>
        </Table.Row>

            )
          })
        }
       
      </Table.Body>
    </Table>

    <Pagination productData={productData} page={page} setPage={setPage} totalData={totalData} />

    </>
  );
};

export default EcommerceProductsPage;
