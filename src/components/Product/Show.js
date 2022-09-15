import * as React from 'react';
import Box from '@mui/material/Box';


import { Cascader, Row ,Modal, Button} from "antd";
import axios from "axios"

function Show(props) {

  // http://14.225.44.83:5000/danhmuc
  const [options, setOptions] = React.useState([])

  React.useEffect(()=>{
    axios.get('http://14.225.44.83:5000/danhmuc')
    .then(function (response) {
      setOptions(response.data.data)
    })
  },[])

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    axios.get('http://14.225.44.83:5000/get_product/'+idProduct)
            .then(function (response) {
                props.setItem(response.data)
                console.log("AB" ,response.data)
        })
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

    const [idProduct, setIdProduct] = React.useState()

    const onChange = (children) => {
        setIdProduct(children[children.length-1])
    };

    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);

    function getItemsInSQL(){
        setShow(true)
    }

    const [dataProduct, setDataProduct] = React.useState([])
    const get = []
    function handleOpen(){
        
        axios.get('http://14.225.44.83:5000/get_product/'+idProduct)
            .then(function (response) {
                props.setItem(response.data)
                console.log("AB" ,response.data)
        })
    }
   
  return (
    <div>
      
        <Button type="primary" onClick={showModal}>
        Xem Sản Phẩm Theo Danh Mục
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Cascader
    
        options={options}
        onChange={onChange}
        />
      </Modal>



    </div>
  )
}

export default Show