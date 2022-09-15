import React, { useEffect, useState } from 'react';
import { Input, Button, Row, List, Container, ListGroupItem, Badge } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, ListInlineItem, Col } from 'reactstrap';
// import Avatar from "@mui/material/Avatar";
import axios from "axios"
import Example from '../../Modal';
import Treedm from '../DanhMuc/Treedm';
import "../../tb.css"
import Stack from '@mui/material/Stack';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Divider,Radio,Table } from 'antd';
import Show from '../DanhMuc/Show'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { alpha, styled } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomizedSnackbars from '../ThongBao'
import AlertDialogSlide from './Delete';
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};


function Product(){
    
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
            title: "Image",
            dataIndex: "ImageURL", 
            width: 50,
            maxWidth: 50, 
            render: theImageURL => <img alt={theImageURL} src={theImageURL}  style={{width:50, height:50}}/> 
             // 'theImageURL' is the variable you must declare in order the render the URL
        },
        {
          title: 'Ratings',
          dataIndex: 'rating',
          render: (Number) => <a>{Number}</a>,
        },
        {
            title: 'shop_location',
            dataIndex: 'shop_location',
            render: (text) => <a>{text}</a>,
          },
        { 
            title: 'liked_count',
            dataIndex:'liked_count',

        
        },
        {
            title:'price_min',
            dataIndex:'price_min',
            return:(Number)=> <>{Number} VNĐ</>
        },
        {
            title:'price_max',
            dataIndex:'price_max',
            return:(Number)=> <>{Number} VNĐ</>
        },
        {
            title:'is_official_shop',
            dataIndex:'is_official_shop',
            return:(text) =><> {text}</>
        },
        {
            title: 'Tùy Chọn',
            key: 'chi_tiet',
            dataIndex: 'chi_tiet',
            render: (item_id) => {
              // if(items.find(item=>item.item_id == item_id))
                const i = items.find(item=>item.itemid == item_id)
                if(i.status == 1){
                  return(
                    <>
                    <EditIcon sx={{marginRight: '5px'}} onClick={()=>editItem(item_id) }/>
                    {/* <DeleteIcon onClick={()=>deleteProduct(item_id)}/> */}
                    <AlertDialogSlide name={i.name} id={item_id} loading={loading2}/>
                  </>
                  )}
                  else
                  return (<AlertDialogSlide name={i.name} id={item_id} loading={loading2}/>)
            },
        }
        ,
        {
            title:'Đã Load',
            dataIndex:'status',
            return:(text) =><> {text}</>
        },



      ];
      const data = [];
    


    const [selectionType, setSelectionType] = useState('checkbox');


    const [items, setItems] = useState([])
    const [checki, setchecki] =useState(false)


    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [infoItem, setInfoItem] = useState({
        "ratings" : [],
        "rating" : 0
    })

    // const [infoShop, setInfoShop] = useState({})
    const [loadItem, setLoadItem] = useState(0)
    const [trueLoad, setTrueLoad] = useState(true)
    const [trueLoad2, setTrueLoad2] = useState(true)

    const [loading, setLoading] = useState(0)

    function setItemSelectInSQL(data){
      setItems(data)
   
    }
   const [re, setRe] = useState(true)

   function loading2(){
    setRe(!re)
   }
    useEffect(() => {
      const timer = setTimeout(() => {
        axios.get('http://14.225.44.83:5000/get_products').then(function (response) {
          setItems(response.data.data)
          setLoadItem(response.data.load)
          setEnd(response.data.load)
          if(response.data.load == 0)setTrueLoad(false)
        // console.log("AB", response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
      }, 500);
      return () => clearTimeout(timer);
    }, [re]);



    items.forEach(function(element, index){
            data.push({"key": index +1, 
            "name": element.name, 
            "ImageURL":element.image, 
            "rating":element.rating.toFixed(2),
            "shop_location":element.shop_location, 
            "liked_count": element.liked_count,
            "price_min":(element.price_min),
            "price_max":(element.price_max),
            "is_official_shop": (element.is_official_shop).toString(),
            "chi_tiet":(element.shopid, element.itemid),
            "shop_id": (element.shopid),
            "item_id": (element.itemid),
            "status" : (element.status),
            "data" : (element)
            },
            
            )
          })


    function editItem(id){
      const data = items.find(item=> item.itemid == id)
      // console.log("AAA", data.name)
      setModal(!modal)
      setInfoItem(data)
      setLoading(id)
    }
    

    const ValidationTextField = styled(TextField)({
      '& input:valid + fieldset': {
        borderColor: 'green',
        borderWidth: 2,
      },
      '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 2,
      },
      '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        padding: '4px !important', // override inline-style
      },
    });

    const [progress, setProgress] = React.useState(0);

    const [loadAuto, setLoadAuto] = useState(-1)
    const [listLoad, setListLoad] = useState([])
    const [end, setEnd] = useState(0)

    const [open, setOpen] = React.useState(false)

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    useEffect(()=>{

      if(loadAuto >= listLoad.length){
        setTrueLoad2(true) 
        // setLoading(false)
        setOpen(true);
        setRe(!re)
        return
      }
      if(loadAuto == -1) return



      axios.get('http://14.225.44.83:5000/default_products/' + listLoad[loadAuto])
      .then(function (response){
        setProgress(Number.parseInt(loadAuto+1) / Number.parseInt(end) * 100)
        setLoadAuto(loadAuto + 1)
        setLoadItem(loadItem-1)
  
        
      })
      .catch(function (error) {
        
      })
      

    },[loadAuto])

    async function loadItemDefault(){
      setTrueLoad(false)
      setTrueLoad2(false)
      // const load = 1
      // const end = loadItem
      
      const data = []
      items.forEach(async (item)=>{
        if(item.status == 0){
            data.push(item.id)
        }
      })
      setListLoad(data)
      setLoadAuto(0)

    }
    
    function saveEdit(){
      setModal(!modal)
      
      const data = {
        "data" : infoItem,
        "id" : infoItem.id
      }
      const customConfig = {
        headers: {
        'Content-Type': 'application/json'
        }
    };
    try{axios.post('http://14.225.44.83:5000/edit_product', JSON.stringify(data), customConfig).then(()=>{
  
    })}catch (e) {}
    }


    

    return(
    <>
    <Stack spacing={2} sx={{ width: '100%' }}>
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: "top", horizontal:"right" }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Cập Nhật Thành Công 
        </Alert>
      </Snackbar>

    </Stack>

    <Container>
      <br/>
      {/* <div style={{float: 'left'}}> */}
      <Show setItem={setItemSelectInSQL} />
      {/* <br/> */}
      {/* <Badge badgeContent={4} color="primary"> */}
      <div  style={{float: 'right'}}>
      <Button color={loadItem==0 ?"success" : "primary"}  disabled={!trueLoad} onClick={loadItemDefault}>Cập Nhật ({loadItem})</Button>
      
      {/* <Button> <CircularProgressWithLabel value={1} hidden=""/></Button> */}
     
      
      </div>

      <Divider />

      <Box sx={{ width: '100%' }} style={{display: (trueLoad2==true? "none" : "")}}>
      <LinearProgressWithLabel value={progress} />
    </Box>

      <Table
        columns={columns}
        dataSource={data}
      />



              <div>
              <Modal isOpen={modal} toggle={toggle} size="xl" style={{zIndex: 100}}>
              <ModalHeader toggle={toggle}>{infoItem.name}</ModalHeader>
              <ModalBody>

              <List type="inline">
                    <ValidationTextField
                    label="Tên Sản Phẩm"
                    required
                    type="text"
                    variant="outlined"
                    defaultValue={infoItem.name}
                    onChange={(e)=>infoItem.name = e.target.value}
                    style={{width: '100%'}}
                    id="validation-outlined-input"
                  />
                  </List>
              <br/>

              <List type="inline">
                    <ValidationTextField
                    label="URL Tự Tạo (Bỏ Trống Sẽ Lấy Link Mặc Định Từ Shopee"
                    type="text"
                    variant="outlined"
                    defaultValue={infoItem.url_admin}
                    onChange={(e)=>infoItem.url_admin = e.target.value}
                    style={{width: '100%'}}
                    id="validation-outlined-input"
                  />
                </List>

                <List type="inline">
                    <ListInlineItem>
                    <ValidationTextField
                    label="Giá Thấp Nhất"
                    required
                    type="Number"
                    variant="outlined"
                    defaultValue={infoItem.price_min}
                    onChange={(e)=>infoItem.price_min = e.target.value}
                    id="validation-outlined-input"
                  /> Đến <ValidationTextField
                  label="Giá Cao Nhất"
                  required
                  variant="outlined"
                  type="Number"
                  defaultValue={infoItem.price_max}
                  onChange={(e)=>infoItem.price_max = e.target.value}
                  id="validation-outlined-input"
                />
                  
                    </ListInlineItem>
                </List>


                <List type="inline">
                  Chi tiết Sản Phẩm
                    {/* attributes */}
                    <TextareaAutosize
                        maxRows={4}
                        aria-label="maximum height"
                        placeholder="Nhập chi tiết sản phẩm"
                        defaultValue={infoItem.attributes}
                        onChange={(e)=>infoItem.attributes = e.target.value}
                        style={{width: '100%'}}
                        required
                      />
                    </List>

                <List type="inline">
                Mô Tả Sản Phẩm
                {/* description */}
                <TextareaAutosize
                    maxRows={4}
                    aria-label="maximum height"
                    placeholder="Nhập mô tả sản phẩm"
                    defaultValue={infoItem.description}
                    onChange={(e)=>infoItem.description = e.target.value}
                    style={{width: '100%'}}
                    required
                  />
                </List>

                {/* <Example attributes={infoItem.attributes} description={infoItem.description}/> */}

                              
                <br/>
                <List type="inline">
                <ListInlineItem >
                <ValidationTextField
                  label="Đã Bán"
                  disabled
                  required
                  variant="outlined"
                  type="Number"
                  defaultValue={infoItem.historical_sold}
                  id="validation-outlined-input"
                />
                </ListInlineItem>
                <ListInlineItem>
                <ValidationTextField
                  label="Lượt Thích"
                  disabled
                  required
                  variant="outlined"
                  type="Number"
                  defaultValue={infoItem.liked_count}
                  id="validation-outlined-input"
                />
                </ListInlineItem>
                </List>
                

                <List type="inline">
                    <ListInlineItem >
                    <ValidationTextField sx={{width: '120px'}}
                  label="Sao Trung Bình"
                  disabled
                  required
                  variant="outlined"
                  type="Number"
                  defaultValue={infoItem.rating}
                  id="validation-outlined-input"
                />
                    </ListInlineItem>

                    <ListInlineItem >
                    <ValidationTextField sx={{width: '90px'}}
                  label="5 sao"
                  disabled
                  required
                  variant="outlined"
                  type="Number"
                  defaultValue={infoItem.ratings[0]}
                  id="validation-outlined-input"
                />
                    </ListInlineItem>
                    
                    <ListInlineItem >
                    <ValidationTextField sx={{width: '90px'}}
                  label="4 sao"
                  disabled
                  required
                  variant="outlined"
                  type="Number"
                  defaultValue={infoItem.ratings[1]}
                  id="validation-outlined-input"
                />
                    </ListInlineItem>

                    <ListInlineItem >
                    <ValidationTextField sx={{width: '90px'}}
                  label="3 sao"
                  disabled
                  required
                  variant="outlined"
                  type="Number"
                  defaultValue={infoItem.ratings[2]}
                  id="validation-outlined-input"
                />
                    </ListInlineItem>
                    
                    <ListInlineItem >
                    <ValidationTextField sx={{width: '90px'}}
                  label="2 sao"
                  disabled
                  required
                  variant="outlined"
                  type="Number"
                  defaultValue={infoItem.ratings[3]}
                  id="validation-outlined-input"
                />
                    </ListInlineItem>
                    
                    <ListInlineItem >
                    <ValidationTextField sx={{width: '90px'}}
                  label="1 sao"
                  disabled
                  required
                  variant="outlined"
                  type="Number"
                  defaultValue={infoItem.ratings[4]}
                  id="validation-outlined-input"
                />
                    </ListInlineItem>
                    
                    </List>

                <hr></hr>
                
                <ListGroupItem className="justify-content-between">
                </ListGroupItem>

                
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onClick={saveEdit}>
                  Do Something
                  </Button>{' '}
                  <Button color="secondary" onClick={toggle}>
                  Cancel
                  </Button>
              </ModalFooter>
              </Modal>
          </div>
          </Container>
          </>

    )
}
export default Product;