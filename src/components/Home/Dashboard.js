import React, { useEffect, useState } from 'react';
import { List, Container, ListGroupItem, Badge } from 'reactstrap';
import { Button, Input, Row } from 'antd';
import { Modal, ModalHeader, ModalBody, ModalFooter, ListInlineItem, Col } from 'reactstrap';
// import Avatar from "@mui/material/Avatar";
import axios from "axios"
import Example from '../../Modal';
import Tree from '../Tree/Tree';


import { Divider,Radio,Table } from 'antd';
// import Show from './components/DanhMuc/Show'

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
function Dashboard(){
    
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
            title: "Hình ảnh",
            dataIndex: "ImageURL", 
            width: 50,
            maxWidth: 50, 
            render: theImageURL => <img alt={theImageURL} src={theImageURL}  style={{width:50, height:50}}/> 
             // 'theImageURL' is the variable you must declare in order the render the URL
        },
        {
          title: 'Sao TB',
          dataIndex: 'rating',
          render: (Number) => <a>{Number}</a>,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'shop_location',
            render: (text) => <a>{text}</a>,
          },
        { 
            title: 'Thích',
            dataIndex:'liked_count',
        },
        {
            title:'Giá thấp',
            dataIndex:'price_min',
            // return:(Number)=> <>{Number} VNĐ</>
        },
        {
            title:'Giá cao',
            dataIndex:'price_max',
            // return:(Number)=> <>{Number} VNĐ</>
        },
        {
            title:'Shop MALL',
            dataIndex:'is_official_shop',
            return:(text) =><> {text}</>
        },,
        {
          title:'Đã bán',
          dataIndex:'historical_sold',
          // return:(text) =><> {text}</>
      },
        {
            title: 'Link Shopee',
            key: 'chi_tiet',
            dataIndex: 'chi_tiet',
            render: (chi_tiet) => (
            <>
            <a href={"https://shopee.vn/product/" + chi_tiet} target="_blank" rel="noopener noreferrer">
                  <OpenInNewIcon/>
            </a>
            </>
            ),
        }



      ];
      const data = [];
    

    const [datarow,setdatarow] = useState([]) 
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
        //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        //  datarow.push('data', selectedRows)
            setdatarow( (`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows))
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
      };


    const [selectionType, setSelectionType] = useState('checkbox');


    const [items, setItems] = useState([])
    const [checki, setchecki] =useState(false)

    const [key, setKey] = useState("laptop")
    const [link, setLink] = useState("")

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [infoItem, setInfoItem] = useState({
        "ratings" : [],
        "rating" : 0
    })
    const [infoShop, setInfoShop] = useState({})
    
    function setItemSelectInSQL(data){
      setItems(data)
    }
    function getItems(){
        // if(key === "") return
        axios.get('http://14.225.44.83:5000/search/'+key)
          .then(function (response) {
            setItems(response.data)
            console.log("A", response.data)
            setchecki(true)

          })
          .catch(function (error) {
            console.log(error)
          })
    }
    // console.log(items)

    items.forEach(function(element, index){
            data.push({"key": index +1, 
            "name": element.name, 
            "ImageURL":element.image, 
            "rating":element.rating.toFixed(2),
            "shop_location":element.shop_location, 
            "liked_count": element.liked_count,
            "price_min":new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format((element.price_min)),
            "price_max":new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format((element.price_max)),
            "is_official_shop": (element.is_official_shop).toString(),
            "chi_tiet":(element.shopid + "/" +element.itemid),
            "shop_id": (element.shopid),
            "item_id": (element.itemid),
            "historical_sold" : (element.historical_sold),
            "data" : (element),
            
            },
            
            )})
          console.log("A", data)

    function getItemsLink(){
        axios.get('http://14.225.44.83:5000/info?url='+link)
        .then(function (response) {
            setModal(!modal)
            // setInfoItem({})
            setInfoItem(response.data.item)
            // setInfoShop(response.data.shop)
            console.log(response.data.item)
        })
        .catch(function (error) {
          console.log(error)
        })
    }

    function getInfoItem(shop_id, item_id){
        setModal(!modal)
        console.log("aaaA", shop_id)
        axios.get('http://14.225.44.83:5000/info_item?shop_id='+shop_id.shop_id+'&item_id='+shop_id.item_id)
          .then(function (response) {
            // setInfoItem({})
            
            setInfoItem(response.data.item)
            // console.log(response.data.item)
            // setInfoShop(response.data.shop)
          })
          .catch(function (error) {
            console.log(error)
          })
    }
    


    return(
    <>

    <Container>

        <Row>
            <Input placeholder="Nhập tên sản phẩm cần tìm" onChange={(e)=>setKey(e.target.value)}/>
            <Button  type="primary" block onClick={getItems}>
            Tìm kiếm
            </Button>
        </Row>
        <hr/>

        <br/>
        <Row>
            <Input placeholder="Tìm kiếm theo link" onChange={(e)=>setLink(e.target.value)}/>
            <Button  type="primary" block onClick={getItemsLink}>
            Tìm kiếm
            </Button>
        </Row>
        <hr/>

        <div className='hic'>
        <div>
         {checki === false? "":<Tree {...datarow}/>}
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        <Radio value="checkbox">Chọn Nhiều</Radio>
        <Radio value="radio">Chọn Một</Radio>

      
      </Radio.Group>

      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>


     
        </div>
        {/* <Show setItem={setItemSelectInSQL}/>
     */}

      </Container>
      
              <div>
              <Modal isOpen={modal} toggle={toggle} size="xl">
              <ModalHeader toggle={toggle}>{infoItem.name}</ModalHeader>
              <ModalBody>
                <List type="inline">
                    <ListInlineItem>
                    {Intl.NumberFormat().format(infoItem.price_min)} - {Intl.NumberFormat().format(infoItem.price_max)} VNĐ
                    </ListInlineItem>
                </List>
                <Example attributes={infoItem.attributes} description={infoItem.description}/>
                
                <br/>
                <List type="inline">
                    <li>Đã Bán: {infoItem.historical_sold}</li>
                </List>

                <hr></hr>
                
                <ListGroupItem className="justify-content-between">
                    <Row>
                        <Col xs="2">
                        Tất Cả 
                        <Badge pill>
                            {(infoItem.rating).toFixed(2)}
                        </Badge>
                        </Col>
                        <Col xs="2">
                        5 Sao
                        <Badge pill>
                            {infoItem.ratings[0]}
                        </Badge>
                        </Col>
                        <Col xs="2">
                        4 Sao
                        <Badge pill>
                            {infoItem.ratings[1]}
                        </Badge>
                        </Col>
                        <Col xs="2">
                        3 Sao
                        <Badge pill>
                            {infoItem.ratings[2]}
                        </Badge>
                        </Col>
                        <Col xs="2">
                        2 Sao
                        <Badge pill>
                            {infoItem.ratings[3]}
                        </Badge>
                        </Col>
                        <Col xs="2">
                        1 Sao
                        <Badge pill>
                            {infoItem.ratings[4]}
                        </Badge>
                        </Col>
                    </Row>
                </ListGroupItem>

                
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onClick={toggle}>
                  Do Something
                  </Button>{' '}
                  <Button color="secondary" onClick={toggle}>
                  Cancel
                  </Button>
              </ModalFooter>
              </Modal>
          </div>
          </>

    )
}
export default Dashboard;