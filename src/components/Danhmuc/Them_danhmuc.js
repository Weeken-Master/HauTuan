import React ,{useState,useRef} from 'react'
import { Col, Row ,Button, Input,Select,Cascader} from 'antd';
import { Label } from 'reactstrap';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload,  notification  } from 'antd';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import {  Space } from 'antd';

import Highlighter from 'react-highlight-words';
import { Table } from 'antd';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

function Them_danhmuc() {
  const { Search } = Input;
  const { Option } = Select;


  const onChangeSearch = (value) => {
    console.log(`selected ${value}`);
  };
  
  const onSearch = (value) => {
    console.log('search:', value);
  };

  const { TextArea } = Input;
  const [options, setOptions] = React.useState([])


  //imgae
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg',
    },
  
   
  ]);
  const [fileList2, setFileList2] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg',
    },
  
   
  ]);
  const [fileList3, setFileList3] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg',
    },
  
   
  ]);
  const [fileList4, setFileList4] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg',
    },
  
   
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => {setFileList(newFileList);
    console.log(fileList[1].slice(-1))
  }
  const handleChange2 = ({ fileList2: newFileList2 }) => {setFileList2(newFileList2);
  
  }
  const handleChange3 = ({ setFileList3: newFileList3 }) => {setFileList3(newFileList3);
  
  }
  const handleChange4 = ({ fileList4: newFileList4 }) => {setFileList4(newFileList4);
  
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  // function  abc(async){
  //   axios.get('http://14.225.44.83:5000/danhmuc')
  //   .then(function (response) {
  //     setOptions(response.data.data)
  //   })

    
  // }

  async function  getalldanhmuc( ){
    axios.get('http://14.225.44.83:5000/danhmuc')
    .then(function (response) {
      setOptions(response.data.data)
    })
  }
  React.useEffect(()=>{
    axios.get('http://14.225.44.83:5000/danhmuc')
    .then(function (response) {
      setOptions(response.data.data)
    })
  },[])

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk =()=>{
    
    setIsModalOpen(false);
  };
  const handleCancel2=()=>{
    setIsModalOpen(false)
  }
// table

const [searchText, setSearchText] = useState('');
const [searchedColumn, setSearchedColumn] = useState('');
const searchInput = useRef(null);

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  setSearchText(selectedKeys[0]);
  setSearchedColumn(dataIndex);
};

const handleReset = (clearFilters) => {
  clearFilters();
  setSearchText('');
};

const getColumnSearchProps = (dataIndex) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div
      style={{
        padding: 8,
      }}
    >
      <Input
        ref={searchInput}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{
          marginBottom: 8,
          display: 'block',
        }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{
            width: 90,
          }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{
            width: 90,
          }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({
              closeDropdown: false,
            });
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
          }}
        >
          Filter
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined
      style={{
        color: filtered ? '#1890ff' : undefined,
      }}
    />
  ),
  onFilter: (value, record) =>
    record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  onFilterDropdownOpenChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100);
    }
  },
  render: (text) =>
    searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{
          backgroundColor: '#ffc069',
          padding: 0,
        }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ) : (
      text
    ),
});
const columns = [
  {
    title: 'Search',
    dataIndex: 'name',
    width: '30%',
    ...getColumnSearchProps('name'),
    filters: [
      {
        text: 'Th???i Trang Nam',
        value: 'Th???i Trang Nam',
      },
      {
        text: 'Th???i Trang N???',
        value: 'Th???i Trang N???',
      }
    
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
    width: '30%',
  },
  {
    title: '???nh',
    dataIndex: 'image',
    width: 100,
    maxWidth: 100, 
    render: image => <img alt={image} src={image}  style={{width:120, height:70}}/> 
   
  },
  {
    title: 'M?? t???',
    dataIndex: 'mota',
   
   
  },
  {
    title: 'Name ',
    dataIndex: 'name',
   
   
  },
  
  {
    title: 'N???i dung ?????u',
    dataIndex: 'noidungdau',
   
   
  },
  {
    title: 'N???i dung cu???i ',
    dataIndex: 'noidungcuoi',
   
   
  },
  {
    title: 'T?? Web',
    dataIndex: 'tieudeweb',
   
   
  },
  {
    title: 'T?? GG',
    dataIndex: 'tieudegg',
   
   
  },
  {
    title: 'URL',
    dataIndex: 'url',
   
   
  },
  {
    title: 'Th??? Tag',
    dataIndex: 'tag',
   
   
  },
  {
    title: 'Button',
    dataIndex: 'id',
    render: (id, name) => (
      <Button type="primary" onClick={()=>showModalcs(id,name) }   >
      Ch???nh s???a
     </Button>
    ),
},
{
  title: 'Button',
  dataIndex: 'id',
  render: (id) => (
    <Button type="primary" onClick={()=>deleteItem(id) }   >
    X??a
   </Button>
  ),
  
},  {
  title: 'id',
  dataIndex: 'id',
 
 
},



];
// ch???nh s???a

const [isModalOpencs, setIsModalOpencs] = useState(false);
const [dataModal,setdadaModal] = useState({});
const showModalcs = (id,name) => {
 
 

  
  console.log("aaaa",name)

  setdadaModal(name)
  setdata_id(id)

  setIsModalOpencs(true);
 
};

const handleOkcs = () => {
  
  if(selectTB === "1"){
    updateb1()
  }
  if(selectTB === "2"){
  
    updateb2()
  }
  if(selectTB === "3"){
  
    updateb3()
  }
  if(selectTB === "4"){
  
    updateb4()
  }
  setIsModalOpencs(false);
};

const handleCancelcs = () => {
 
  setIsModalOpencs(false);
};

//


const [data_id,setdata_id] = useState()
const [datadmcs, setdatadmcs] = useState({
  namecs:"",
  tieudewecs:"",
  tieudegooglecs:'',
  urlcs:"",
  imagecs:"",
  motacs :"",
  noidungdaucs:"",
  noidungcuoics:"",
  tagcs:""
})
const onnamecs = (event) => {
  setdatadmcs((prev) => ({ ...prev, namecs: event.target.value }));
  
};

const ontieudewebcs= (event) => {
  setdatadmcs((prev) => ({ ...prev, tieudewebcs: event.target.value }));
  console.log(datadmcs.tieudewebcs)
};
const ontieudegooglecs = (event) => {
  setdatadmcs((prev) => ({ ...prev, tieudegooglecs: event.target.value }));

};

const onurlcs = (event) => {
  setdatadmcs((prev) => ({ ...prev, urlcs: event.target.value }));
  
};
const onnoidungdaucs = (event) => {
  setdatadmcs((prev) => ({ ...prev, noidungdaucs: event.target.value }));
 
};
const onnoidungcuoics = (event) => {
  setdatadmcs((prev) => ({ ...prev, noidungcuoics: event.target.value }));
 
};
const ontagcs = (event) => {
  setdatadmcs((prev) => ({ ...prev, tagcs: event.target.value }));
 
};
const onmotacs = (event) => {
  setdatadmcs((prev) => ({ ...prev, motacs: event.target.value }));
 
};



const getdatatb1=()=>{
  try {
    axios.get('http://14.225.44.83:5000/getalldanhmucb1')
        .then(function (response){
         
          setdataTB(response.data.data)
          notification.success({
            message: 'Get th??nh c??ng',
            className: 'custom-class',
            style: {
              width: 600,
            },
          });
        })
  } catch (error) {
    
  }
}
const getdatatb2=()=>{
  try {
    axios.get('http://14.225.44.83:5000/getalldanhmucb2')
        .then(function (response){
         
          setdataTB(response.data.data)
          notification.success({
            message: 'Get th??nh c??ng',
            className: 'custom-class',
            style: {
              width: 600,
            },
          });
        })
  } catch (error) {
    
  }
}
const getdatatb3=()=>{
  try {
    axios.get('http://14.225.44.83:5000/getalldanhmucb3')
        .then(function (response){
         
          setdataTB(response.data.data)
          notification.success({
            message: 'Get th??nh c??ng',
            className: 'custom-class',
            style: {
              width: 600,
            },
          });
        })
  } catch (error) {
    
  }
}
const getdatatb4=()=>{
  try {
    axios.get('http://14.225.44.83:5000/getalldanhmucb4')
        .then(function (response){
         
          setdataTB(response.data.data)
          notification.success({
            message: 'Get th??nh c??ng',
            className: 'custom-class',
            style: {
              width: 600,
            },
          });
        })
  } catch (error) {
    
  }
}
async function deleteItem(id){
  
  if(selectTB === "1"){
    try {
      const data = new FormData();
      data.append("id_delete",id)
      data.append("danhmuc","danhmuc01")
      axios.post('http://14.225.44.83:5000/delete/danhmuc', data).then((response) => {
             
        setTimeout(() => {
          getalldanhmuc()
        }, 100);   
        setTimeout(() => {
          getdatatb1()
        }, 500);  
        setTimeout(() => {
          getalldanhmucOption1()
        }, 1000);        
        
  
      
        notification.success({
          message: 'Delete th??nh c??ng',
          className: 'custom-class',
          style: {
            width: 600,
          },
        });

       
       
      },
      
      (error) => {
        notification.error({
          message: 'Delete Fail C?? th??? c??n t???n t???i danh m???c con',
          
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
      });
    } catch (error) {   
    }

  }
  if(selectTB === "2"){
    try {
      const data = new FormData();
      data.append("id_delete",id)
      data.append("danhmuc","danhmuc02")
      axios.post('http://14.225.44.83:5000/delete/danhmuc', data).then((response) => {
             
        setTimeout(() => {
          getalldanhmuc()
        }, 300);   
        setTimeout(() => {
          getdatatb2()
        }, 150);
        setTimeout(() => {
          getalldanhmucOption2()
        }, 1000);            
         
  
      
        notification.success({
          message: 'Delete th??nh c??ng',
          className: 'custom-class',
          style: {
            width: 600,
          },
        });

       
       
      },
      
      (error) => {
        notification.error({
          message: 'Delete Fail C?? th??? c??n t???n t???i danh m???c con',
          
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
      });
    } catch (error) {   
    }

  }
  if(selectTB === "3"){
    try {
      const data = new FormData();
      data.append("id_delete",id)
      data.append("danhmuc","danhmuc03")
      axios.post('http://14.225.44.83:5000/delete/danhmuc', data).then((response) => {
        setTimeout(() => {
          getalldanhmuc()
        }, 100);   
        setTimeout(() => {
          getdatatb3()
        }, 500); 
        setTimeout(() => {
          getalldanhmucOption3()
        }, 1000);            
       
  
      
        notification.success({
          message: 'Delete th??nh c??ng',
          className: 'custom-class',
          style: {
            width: 600,
          },
        });

       
       
      },
      
      (error) => {
        notification.error({
          message: 'Delete Fail C?? th??? c??n t???n t???i danh m???c con',
          
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
      });
    } catch (error) {   
    }

  }
  if(selectTB === "4"){
    try {
      const data = new FormData();
      data.append("id_delete",id)
      data.append("danhmuc","danhmuc04")
      axios.post('http://14.225.44.83:5000/delete/danhmuc', data).then((response) => {
    
        setTimeout(() => {
          getalldanhmuc()
        }, 1000);   
        setTimeout(() => {
          getdatatb4()
        }, 400);  
       
  
  
      
        notification.success({
          message: 'Delete th??nh c??ng',
          className: 'custom-class',
          style: {
            width: 600,
          },
        });

       
       
      },
      
      (error) => {
        notification.error({
          message: 'Delete Fail C?? th??? c??n t???n t???i danh m???c con',
          
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
      });
    } catch (error) {   
    }

  }


   console.log(id)
 

}

const updateb1 = async()=>{

 
  
  try {
    let lenghtlist = fileList.length
     console.log("co",fileList[lenghtlist].response.url)
    setdatadmcs((prev) => ({ ...prev, imagecs:fileList[lenghtlist-1].response.url}));
  
    console.log(fileList[lenghtlist].response.url)

  } catch (error) {
    console.log("n??y la ko upload image",fileList[0].url)
    // setimagedata( fileList[0].url)
    setdatadmcs((prev) => ({ ...prev, imagecs: fileList[0].url}));

  }
    console.log("ab",data_id)
    console.log("ab", datadmcs.namecs)
    try {
      const data = new FormData();
      data.append("id",data_id)
      data.append("danhmuc","danhmuc01")
      data.append("image", datadmcs.imagecs);
      data.append("mota", datadmcs.motacs); 
      data.append("name", datadmcs.namecs);
      data.append("noidungdau", datadmcs.noidungdaucs); 
      data.append("noidungcuoi", datadmcs.noidungcuoics);
      data.append("tag", datadmcs.tagcs); 
      data.append("tieudegg", datadmcs.tieudegooglecs); 
      data.append("tieudeweb", datadmcs.tieudewebcs); 
      data.append("url", datadmcs.urlcs); 

      axios.post('http://14.225.44.83:5000/update/danhmuc', data).then((response) => {
        notification.success({
          message: 'Update th??nh c??ng',
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
       setTimeout(() => getalldanhmuc(), 300);
       setTimeout(() => getdatatb1(), 100);
      
       
       
      },
      
      (error) => {
        notification.error({
          message: 'Update Fail',
          
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
      });
    } catch (error) {   
    }

}




const updateb2 =()=>{
 
 
  try {
    let lenghtlist = fileList.length
     console.log("co",fileList[lenghtlist].response.url)
    setdatadmcs((prev) => ({ ...prev, imagecs:fileList[lenghtlist-1].response.url}));
  
    console.log(fileList[lenghtlist].response.url)

  } catch (error) {
    console.log("n??y la ko upload image",fileList[0].url)
    // setimagedata( fileList[0].url)
    setdatadmcs((prev) => ({ ...prev, imagecs: fileList[0].url}));

  }
    console.log("id_Truoc", selectid)
    console.log("ab",data_id)
    console.log("ab", datadmcs.namecs)
    try {
      const data = new FormData();
      data.append("id_truoc", selectid)
      data.append("id",data_id)
      data.append("danhmuc","danhmuc02")
      data.append("image", datadmcs.imagecs);
      data.append("mota", datadmcs.motacs); 
      data.append("name", datadmcs.namecs);
      data.append("noidungdau", datadmcs.noidungdaucs); 
      data.append("noidungcuoi", datadmcs.noidungcuoics);
      data.append("tag", datadmcs.tagcs); 
      data.append("tieudegg", datadmcs.tieudegooglecs); 
      data.append("tieudeweb", datadmcs.tieudewebcs); 
      data.append("url", datadmcs.urlcs); 

      axios.post('http://14.225.44.83:5000/update/danhmucs', data).then((response) => {
        notification.success({
          message: 'Update th??nh c??ng',
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
        setTimeout(() => getalldanhmuc(), 200);
        setTimeout(() => getdatatb2(), 400);
        setTimeout(() => getalldanhmucOption1, 600);


        setTimeout(()=> axios.get('http://14.225.44.83:5000/getalldanhmucb2')
        .then(function (response){
         
          setdataTB(response.data.data)
          notification.success({
            message: 'Get th??nh c??ng',
            className: 'custom-class',
            style: {
              width: 600,
            },
          });
        }) ,850)
      },
      
      (error) => {
        notification.error({
          message: 'Update Fail',
          
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
      });
    } catch (error) {   
    }

}
const updateb3=()=>{
  
  try {
    let lenghtlist = fileList.length
     console.log("co",fileList[lenghtlist].response.url)
    setdatadmcs((prev) => ({ ...prev, imagecs:fileList[lenghtlist-1].response.url}));
  
    console.log(fileList[lenghtlist].response.url)

  } catch (error) {
    console.log("n??y la ko upload image",fileList[0].url)
    // setimagedata( fileList[0].url)
    setdatadmcs((prev) => ({ ...prev, imagecs: fileList[0].url}));

  }
    try {
      const data = new FormData();
      data.append("id_truoc", selectid)
      data.append("id",data_id)
      data.append("danhmuc","danhmuc03")
      data.append("image", datadmcs.imagecs);
      data.append("mota", datadmcs.motacs); 
      data.append("name", datadmcs.namecs);
      data.append("noidungdau", datadmcs.noidungdaucs); 
      data.append("noidungcuoi", datadmcs.noidungcuoics);
      data.append("tag", datadmcs.tagcs); 
      data.append("tieudegg", datadmcs.tieudegooglecs); 
      data.append("tieudeweb", datadmcs.tieudewebcs); 
      data.append("url", datadmcs.urlcs); 

      axios.post('http://14.225.44.83:5000/update/danhmucs', data).then((response) => {
        notification.success({
          message: 'Update th??nh c??ng',
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
        setTimeout(() => getalldanhmuc(), 200);
        setTimeout(() => getdatatb3(), 400);
        setTimeout(() => getalldanhmucOption2, 600);

       


        setTimeout(()=> axios.get('http://14.225.44.83:5000/getalldanhmucb3')
        .then(function (response){
         
          setdataTB(response.data.data)
          notification.success({
            message: 'Get th??nh c??ng',
            className: 'custom-class',
            style: {
              width: 600,
            },
          });
        }) ,850);  
      },
      
      (error) => {
        notification.error({
          message: 'Update Fail',
          
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
      });
    } catch (error) {   
    }
}
const updateb4 =()=>{
  try {
    let lenghtlist = fileList3.length
     console.log("co",fileList3[lenghtlist].response.url)
    setdatadmcs((prev) => ({ ...prev, image:fileList3[lenghtlist-1].response.url}));
  
    // console.log(images)

  } catch (error) {
    console.log("n??y la ko upload image",fileList3[0].url)
    // setimagedata( fileList[0].url)
    setdatadmcs((prev) => ({ ...prev, image: fileList3[0].url}));

  }

  try {
    const data = new FormData();
    data.append("id_truoc", selectid)
    data.append("id",data_id)
    data.append("danhmuc","danhmuc04")
    data.append("image", datadmcs.imagecs);
    data.append("mota", datadmcs.motacs); 
    data.append("name", datadmcs.namecs);
    data.append("noidungdau", datadmcs.noidungdaucs); 
    data.append("noidungcuoi", datadmcs.noidungcuoics);
    data.append("tag", datadmcs.tagcs); 
    data.append("tieudegg", datadmcs.tieudegooglecs); 
    data.append("tieudeweb", datadmcs.tieudewebcs); 
    data.append("url", datadmcs.urlcs); 

    axios.post('http://14.225.44.83:5000/update/danhmucs', data).then((response) => {
      notification.success({
        message: 'Update th??nh c??ng',
        className: 'custom-class',
        style: {
          width: 600,
        },
      });
      setTimeout(() => getalldanhmuc(), 200);
      setTimeout(() => getdatatb4(), 400);
      setTimeout(() => getalldanhmucOption3, 600);


      setTimeout(()=> axios.get('http://14.225.44.83:5000/getalldanhmucb4')
      .then(function (response){
       
        setdataTB(response.data.data)
        notification.success({
          message: 'Get th??nh c??ng',
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
      }) ,850);   
    },
    
    (error) => {
      notification.error({
        message: 'Update Fail',
        
        className: 'custom-class',
        style: {
          width: 600,
        },
      });
    });
  } catch (error) {   
  }
}











const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};


const [selectid,setselectid] = useState("");
const onChangeSelect = (value) => {
  console.log(`selected ${value}`);
  setselectid(value)
};

  // get  data danh muc

  const [datadm, setdatadm] = useState({
    name:"",
    tieudeweb:"",
    tieudegoogle:'',
    url:"",
    image:"https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg",
    mota :"",
    noidungdau:"",
    noidungcuoi:"",
    tag:""
  })
  const onname = (event) => {
    setdatadm((prev) => ({ ...prev, name: event.target.value }));
    console.log(datadm.name)
  };
  const ontieudeweb= (event) => {
    setdatadm((prev) => ({ ...prev, tieudeweb: event.target.value }));
    console.log(datadm.tieudeweb)
  };
  const ontieudegoogle = (event) => {
    setdatadm((prev) => ({ ...prev, tieudegoogle: event.target.value }));
 
  };
 
  const onurl = (event) => {
    setdatadm((prev) => ({ ...prev, url: event.target.value }));
    
  };
  const onnoidungdau = (event) => {
    setdatadm((prev) => ({ ...prev, noidungdau: event.target.value }));
   
  };
  const onnoidungcuoi = (event) => {
    setdatadm((prev) => ({ ...prev, noidungcuoi: event.target.value }));
   
  };
  const ontag = (event) => {
    setdatadm((prev) => ({ ...prev, tag: event.target.value }));
   
  };
  const onmota = (event) => {
    setdatadm((prev) => ({ ...prev, mota: event.target.value }));
   
  };
 
 

  const [image_data,setimagedata] = useState("")
  const sumbmit01 =  async ()=>{
   
   
 
   
    try {
      var lenghtlist = fileList.length
       console.log("co",fileList[lenghtlist].response.url)
      setdatadm((prev) => ({ ...prev, image:fileList[lenghtlist-1].response.url}));
    
      // console.log(images)

    } catch (error) {
      console.log("n??y la ko upload image",fileList[0].url)
      // setimagedata( fileList[0].url)
      setdatadm((prev) => ({ ...prev, image: fileList[0].url}));

    }
    
  
    try {
      const data = new FormData();
    
      data.append("mota", datadm.mota); 
      data.append("image", datadm.image);
      data.append("name", datadm.name);
      data.append("noidungdau", datadm.noidungdau); 
      data.append("noidungcuoi", datadm.noidungcuoi);
      data.append("tag", datadm.tag); 
      data.append("tieudegg", datadm.tieudegoogle); 
      data.append("tieudeweb", datadm.tieudeweb); 
      data.append("url", datadm.url); 
      axios.post('http://14.225.44.83:5000/add/danhmuc01', data).then((response) => {
        
        notification.success({
          message: 'Th??m th??nh c??ng',
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
               
        setTimeout(() => {
          getalldanhmuc()
        }, 100);   
        setTimeout(() => {
          getdatatb1()
        }, 500);         
  
      },
      
      (error) => {
        notification.error({
          message: 'Th??m Fail',
          
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
      });
    } catch (error) {   
    }}

  const sumbmit02 =  async ()=>{
   
   
      try {
        let lenghtlist = fileList2.length
         console.log("co",fileList2[lenghtlist].response.url)
        setdatadm((prev) => ({ ...prev, image:fileList2[lenghtlist-1].response.url}));
      
        // console.log(images)
  
      } catch (error) {
        console.log("n??y la ko upload image",fileList2[0].url)
        // setimagedata( fileList[0].url)
        setdatadm((prev) => ({ ...prev, image: fileList2[0].url}));
  
      }
      try {
        const data = new FormData();
        data.append("id_truoc",selectid)
        data.append("image", datadm.image);
        data.append("mota", datadm.mota); 
        data.append("name", datadm.name);
        data.append("noidungdau", datadm.noidungdau); 
        data.append("noidungcuoi", datadm.noidungcuoi);
        data.append("tag", datadm.tag); 
        data.append("tieudegg", datadm.tieudegoogle); 
        data.append("tieudeweb", datadm.tieudeweb); 
        data.append("url", datadm.url); 
        axios.post('http://14.225.44.83:5000/add/danhmuc02', data).then((response) => {
          
          notification.success({
            message: 'Th??m th??nh c??ng',
            className: 'custom-class',
            style: {
              width: 600,
            },
          });
          setTimeout(() => {
            getalldanhmuc()
          }, 100);   
          setTimeout(() => {
            getdatatb2()
          }, 500);  
          
          setTimeout(() => {
             getalldanhmucOption2()
          }, 700);  
          
          setTimeout(() => {
            getalldanhmucOption1()
         }, 1000); 
        },

        
        (error) => {
          notification.error({
            message: 'Th??m Fail',
            
            className: 'custom-class',
            style: {
              width: 600,
            },
          });
        });
      } catch (error) {   
      }}
  const sumbmit03 =  async ()=>{
   
   
        
      try {
        let lenghtlist = fileList3.length
         console.log("co",fileList3[lenghtlist].response.url)
        setdatadm((prev) => ({ ...prev, image:fileList3[lenghtlist-1].response.url}));
      
        // console.log(images)
  
      } catch (error) {
        console.log("n??y la ko upload image",fileList3[0].url)
        // setimagedata( fileList[0].url)
        setdatadm((prev) => ({ ...prev, image: fileList3[0].url}));
  
      }
        try {
          const data = new FormData();
          data.append("id_truoc",selectid)
          data.append("image", datadm.image);
          data.append("mota", datadm.mota); 
          data.append("name", datadm.name);
          data.append("noidungdau", datadm.noidungdau); 
          data.append("noidungcuoi", datadm.noidungcuoi);
          data.append("tag", datadm.tag); 
          data.append("tieudegg", datadm.tieudegoogle); 
          data.append("tieudeweb", datadm.tieudeweb); 
          data.append("url", datadm.url); 
          axios.post('http://14.225.44.83:5000/add/danhmuc03', data).then((response) => {
            
            notification.success({
              message: 'Th??m th??nh c??ng',
              className: 'custom-class',
              style: {
                width: 600,
              },
            });
            setTimeout(() => {
              getalldanhmuc()
            }, 1000);   
            setTimeout(() => {
              getdatatb3()
            }, 1600);  
            setTimeout(() => {
              getalldanhmucOption2()
           }, 2500);   
          },
  
          
          (error) => {
            notification.error({
              message: 'Th??m Fail',
              
              className: 'custom-class',
              style: {
                width: 600,
              },
            });
          });
        } catch (error) {   
  }}
  const sumbmit04 =  async ()=>{
   
   
    
    try {
      let lenghtlist = fileList3.length
       console.log("co",fileList3[lenghtlist].response.url)
      setdatadm((prev) => ({ ...prev, image:fileList3[lenghtlist-1].response.url}));
    
      // console.log(images)

    } catch (error) {
      console.log("n??y la ko upload image",fileList3[0].url)
      // setimagedata( fileList[0].url)
      setdatadm((prev) => ({ ...prev, image: fileList3[0].url}));

    }
    try {
      const data = new FormData();
      data.append("id_truoc",selectid)
      data.append("image", datadm.image);
      data.append("mota", datadm.mota); 
      data.append("name", datadm.name);
      data.append("noidungdau", datadm.noidungdau); 
      data.append("noidungcuoi", datadm.noidungcuoi);
      data.append("tag", datadm.tag); 
      data.append("tieudegg", datadm.tieudegoogle); 
      data.append("tieudeweb", datadm.tieudeweb); 
      data.append("url", datadm.url); 
      axios.post('http://14.225.44.83:5000/add/danhmuc04', data).then((response) => {
        
        notification.success({
          message: 'Th??m th??nh c??ng',
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
        setTimeout(() => {
          getalldanhmuc()
        }, 1000); 
        setTimeout(() => {
          getalldanhmucOption3()
          
        }, 1500);    
        setTimeout(() => {
          getdatatb4()
          
        }, 2500);   
      },

      
      (error) => {
        notification.error({
          message: 'Th??m Fail',
          
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
      });
    } catch (error) {   
    }}

   // tree
   const onChange2 = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  
  };
  
  const filter = (inputValue, path) =>
    path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
 



    const [selectTB, setselectTB] = useState();
    // select c???a tk table
    const [dataTB, setdataTB] = useState([]);






    const onChangeselecTB = (value) => {
      console.log(`selected ${value}`);
      setselectTB(value)
    };
    
    const onSearchTB = (value) => {
      console.log('search:', value);
      setselectTB(value)
    };


    // 

    // ch???n danh m???c
    const ChonDanhMuc = async() =>{
      
        if(selectTB ==="1"){
            try {
              axios.get('http://14.225.44.83:5000/getalldanhmucb1')
                  .then(function (response){
                   
                    setdataTB(response.data.data)
                    notification.success({
                      message: 'Get th??nh c??ng',
                      className: 'custom-class',
                      style: {
                        width: 600,
                      },
                    });
                  })
            } catch (error) {
              
            }

          
        }
        if(selectTB ==="2"){
          try {
            axios.get('http://14.225.44.83:5000/getalldanhmucb2')
                .then(function (response){
                 
                  setdataTB(response.data.data)
                  notification.success({
                    message: 'Get th??nh c??ng',
                    className: 'custom-class',
                    style: {
                      width: 600,
                    },
                  });
                })
          } catch (error) {
            notification.error({
              message: 'Get Fail',
              
              className: 'custom-class',
              style: {
                width: 600,
              },
            });
          }

        
      }
      if(selectTB ==="3"){
        try {
          axios.get('http://14.225.44.83:5000/getalldanhmucb3')
              .then(function (response){
               
                setdataTB(response.data.data)
                notification.success({
                  message: 'Get th??nh c??ng',
                  className: 'custom-class',
                  style: {
                    width: 600,
                  },
                });
              })
        } catch (error) {
          notification.error({
            message: 'Get Fail',
            
            className: 'custom-class',
            style: {
              width: 600,
            },
          });}}
    if(selectTB ==="4"){
      try {
        axios.get('http://14.225.44.83:5000/getalldanhmucb4')
            .then(function (response){
             
              setdataTB(response.data.data)
              notification.success({
                message: 'Get th??nh c??ng',
                className: 'custom-class',
                style: {
                  width: 600,
                },
              });
            })
      } catch (error) {
        notification.error({
          message: 'Get Fail',
          
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
        }}
         
        
    }



    // get b???c 1
     const [dataoption1, setdataoption1] = useState([])
     const [dataoption2, setdataoption2] = useState([])
     const [dataoption3, setdataoption3] = useState([])

    function getalldanhmucOption1(){
      axios.get('http://14.225.44.83:5000/getalldanhmucb1')
      .then(function (response) {
        setdataoption1(response.data.data)
        
      })
    }
    function getalldanhmucOption2(){
      axios.get('http://14.225.44.83:5000/getalldanhmucb2')
      .then(function (response) {
        setdataoption2(response.data.data)
        
      })
    }
     function getalldanhmucOption3(){
      axios.get('http://14.225.44.83:5000/getalldanhmucb3')
      .then(function (response) {
        setdataoption3(response.data.data)
        
      })
    }

    React.useEffect(()=>{
     
  
      const timer = setTimeout(() => getalldanhmucOption1(), 1000);
      const timer2 = setTimeout(() => getalldanhmucOption2(), 3500);
      const timer3 = setTimeout(() => getalldanhmucOption3(), 5500);
      // const timer4 = setTimeout(() => getalldanhmucOption4(), 4100);
      return () => {
        clearTimeout(timer, timer2, timer3);
      };
    },[])
  return (
    <>
          <Modal  title="Ch???nh s???a " open={isModalOpencs} onOk={handleOkcs} onCancel={handleCancelcs}>

          {  selectTB === "1"?  <> 
        
              <Input.Group compact style={{marginTop:"0.5rem"}}>
                 <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p t??n :  </label>
              <Input style={{ width: '90%' , marginTop:"0.2rem"}} onChange={onnamecs}    placeholder={dataModal.name}></Input> 
              <label style={{ width: '90%' , marginTop:"0.2rem"}}>Ti??u ????? web : </label>
              <Input style={{ width: '90%',marginTop:"0.2rem" }}  onChange={ontieudewebcs} placeholder={dataModal.tieudeweb}></Input>
              <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p ????? Google : </label> 
              <Input style={{ width: '90%' ,marginTop:"0.2rem"}}  onChange={ontieudegooglecs} placeholder={dataModal.tieudegoogle}></Input> 
              <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p m?? t??? : </label>
              <TextArea showCount maxLength={90} style={{ height: 120 ,width: '90%',marginTop:"0.2rem"}}  onChange={onmotacs}  placeholder={dataModal.mota}/>
              <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p Url : </label>
              <Input style={{ width: '90%' ,marginTop:"0.2rem", marginBottom:"0.2rem"}}  placeholder={dataModal.url}  onChange={onurlcs}></Input> 
              <Upload
              style={{ marginTop:"0.2rem"}}

              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img
                alt="example"
                style={{
                  width: '90%',
                }}
                src={previewImage}
              />
            </Modal>
            <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p n???i dung ?????u :</label>
            <Input style={{ width: '90%' ,marginTop:"0.2rem"}}   onChange={onnoidungdaucs}placeholder={dataModal.noidungdau}></Input> 
            <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p n???i dung cu???i :</label>
            <Input style={{ width: '90%' ,marginTop:"0.2rem"}}  onChange={onnoidungcuoics} placeholder={dataModal.noidungcuoi}></Input> 
            <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p th??? tag :</label>
            <Input style={{ width: '90%' ,marginTop:"0.2rem",marginBottom:"0.2rem"}}  onChange={ontagcs} placeholder={dataModal.tag}></Input> 

            </Input.Group>
                    
          </>

          :selectTB === "2"?<> 
          <label style={{ width: '90%' , marginTop:"0.2rem"}}>M???c cha</label>
          <Select  style={{width:"30%", marginLeft:"1rem"}}
          showSearch
          placeholder="L???y danh m???c cha"
          optionFilterProp="children"
          onChange={onChangeSelect}
          onSearch={onSearch}
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
           { dataoption1.map(item=>{
         return(
          <Option value={item.id}   >{item.name}</Option>
          )})}
        </Select>
          
          <Input.Group compact style={{marginTop:"0.5rem"}}>
                 <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p t??n :</label>
              <Input style={{ width: '90%' , marginTop:"0.2rem"}} onChange={onnamecs}  placeholder={dataModal.name}></Input> 
              <label style={{ width: '90%' , marginTop:"0.2rem"}}>Ti??u ????? web :</label>
              <Input style={{ width: '90%',marginTop:"0.2rem" }}  onChange={ontieudewebcs} placeholder={dataModal.tieudeweb}></Input>
              <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p ????? Google :</label> 
              <Input style={{ width: '90%' ,marginTop:"0.2rem"}}  onChange={ontieudegooglecs} placeholder={dataModal.tieudegg}></Input> 
              <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p m?? t??? :</label>
              <TextArea showCount maxLength={90} style={{ height: 120 ,width: '90%',marginTop:"0.2rem"}}  onChange={onmotacs}  placeholder={dataModal.mota}/>
              <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p Url :</label>
              <Input style={{ width: '90%' ,marginTop:"0.2rem", marginBottom:"0.2rem"}}  placeholder={dataModal.url}  onChange={onurlcs}></Input> 
              <Upload
                style={{ marginTop:"0.2rem"}}

                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList2}
                onPreview={handlePreview}
                onChange={handleChange2}
              >
                {fileList2.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                  alt="example"
                  style={{
                    width: '90%',
                  }}
                  src={previewImage}
                />
              </Modal>
    
            <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p n???i dung ?????u :</label>
            <Input style={{ width: '90%' ,marginTop:"0.2rem"}}   onChange={onnoidungdaucs}placeholder={dataModal.noidungdau}></Input> 
            <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p n???i dung cu???i :</label>
            <Input style={{ width: '90%' ,marginTop:"0.2rem"}}  onChange={onnoidungcuoics} placeholder={dataModal.noidungcuoi}></Input> 
            <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p th??? tag :</label>
            <Input style={{ width: '90%' ,marginTop:"0.2rem",marginBottom:"0.2rem"}}  onChange={ontagcs} placeholder={dataModal.tag}></Input> 

            </Input.Group>
  
          
          </>: selectTB === "3"?<>
          <label style={{ width: '90%' , marginTop:"0.2rem"}}>M???c cha</label>
          <Select  style={{width:"30%", marginLeft:"1rem"}}
          showSearch
          placeholder="L???y danh m???c cha"
          optionFilterProp="children"
          onChange={onChangeSelect}
          onSearch={onSearch}
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
           { dataoption2.map(item=>{
         return(
          <Option value={item.id}   >{item.name}</Option>
          )})}
        </Select>
          
          <Input.Group compact style={{marginTop:"0.5rem"}}>
                 <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p t??n :</label>
              <Input style={{ width: '90%' , marginTop:"0.2rem"}} onChange={onnamecs}  placeholder={dataModal.name}></Input> 
              <label style={{ width: '90%' , marginTop:"0.2rem"}}>Ti??u ????? web :</label>
              <Input style={{ width: '90%',marginTop:"0.2rem" }}  onChange={ontieudewebcs} placeholder={dataModal.tieudeweb}></Input>
              <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p ????? Google :</label> 
              <Input style={{ width: '90%' ,marginTop:"0.2rem"}}  onChange={ontieudegooglecs} placeholder={dataModal.tieudegg}></Input> 
              <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p m?? t??? :</label>
              <TextArea showCount maxLength={90} style={{ height: 120 ,width: '90%',marginTop:"0.2rem"}}  onChange={onmotacs}  placeholder={dataModal.mota}/>
              <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p Url :</label>
              <Input style={{ width: '90%' ,marginTop:"0.2rem", marginBottom:"0.2rem"}}  placeholder={dataModal.url}  onChange={onurlcs}></Input> 
              <Upload
                style={{ marginTop:"0.2rem"}}

                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList3}
                onPreview={handlePreview}
                onChange={handleChange3}
              >
                {fileList3.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                  alt="example"
                  style={{
                    width: '90%',
                  }}
                  src={previewImage}
                />
              </Modal>
    
            <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p n???i dung ?????u :</label>
            <Input style={{ width: '90%' ,marginTop:"0.2rem"}}   onChange={onnoidungdaucs}placeholder={dataModal.noidungdau}></Input> 
            <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p n???i dung cu???i :</label>
            <Input style={{ width: '90%' ,marginTop:"0.2rem"}}  onChange={onnoidungcuoics} placeholder={dataModal.noidungcuoi}></Input> 
            <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p th??? tag :</label>
            <Input style={{ width: '90%' ,marginTop:"0.2rem",marginBottom:"0.2rem"}}  onChange={ontagcs} placeholder={dataModal.tag}></Input> 

            </Input.Group>
  
         
          
          
          
          
          
          
          
          
          
          
          
          </>: selectTB === "4"?<>
          
          <label style={{ width: '90%' , marginTop:"0.2rem"}}>M???c cha</label>
          <Select  style={{width:"30%", marginLeft:"1rem"}}
          showSearch
          placeholder="L???y danh m???c cha"
          optionFilterProp="children"
          onChange={onChangeSelect}
          onSearch={onSearch}
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
           { dataoption3.map(item=>{
         return(
          <Option value={item.id}   >{item.name}</Option>
          )})}
        </Select>
          
          <Input.Group compact style={{marginTop:"0.5rem"}}>
                 <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p t??n :</label>
              <Input style={{ width: '90%' , marginTop:"0.2rem"}} onChange={onnamecs}  placeholder={dataModal.name}></Input> 
              <label style={{ width: '90%' , marginTop:"0.2rem"}}>Ti??u ????? web :</label>
              <Input style={{ width: '90%',marginTop:"0.2rem" }}  onChange={ontieudewebcs} placeholder={dataModal.tieudeweb}></Input>
              <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p ????? Google :</label> 
              <Input style={{ width: '90%' ,marginTop:"0.2rem"}}  onChange={ontieudegooglecs} placeholder={dataModal.tieudegg}></Input> 
              <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p m?? t??? :</label>
              <TextArea showCount maxLength={90} style={{ height: 120 ,width: '90%',marginTop:"0.2rem"}}  onChange={onmotacs}  placeholder={dataModal.mota}/>
              <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p Url :</label>
              <Input style={{ width: '90%' ,marginTop:"0.2rem", marginBottom:"0.2rem"}}  placeholder={dataModal.url}  onChange={onurlcs}></Input> 
              <Upload
                style={{ marginTop:"0.2rem"}}

                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList4}
                onPreview={handlePreview}
                onChange={handleChange4}
              >
                {fileList4.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                  alt="example"
                  style={{
                    width: '90%',
                  }}
                  src={previewImage}
                />
              </Modal>
    
            <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p n???i dung ?????u :</label>
            <Input style={{ width: '90%' ,marginTop:"0.2rem"}}   onChange={onnoidungdaucs}placeholder={dataModal.noidungdau}></Input> 
            <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p n???i dung cu???i :</label>
            <Input style={{ width: '90%' ,marginTop:"0.2rem"}}  onChange={onnoidungcuoics} placeholder={dataModal.noidungcuoi}></Input> 
            <label style={{ width: '90%' , marginTop:"0.2rem"}}>Nh???p th??? tag :</label>
            <Input style={{ width: '90%' ,marginTop:"0.2rem",marginBottom:"0.2rem"}}  onChange={ontagcs} placeholder={dataModal.tag}></Input> 

            </Input.Group>
  
         
          
          
          
          
          
          
          
          
          
          </>:"Fail"

          } 

          </Modal>


        <Row >
        <Col span={24}>


       




        <Button type="primary" onClick={showModal}>
        T???t c??? danh m???c cha hi???n t???i
      </Button>
              <Modal title="" open={isModalOpen}  onCancel={handleCancel2} onOk={handleCancel2}>
              <Cascader
                options={options}
                onChange={onChangeSearch}
                placeholder="Please select"
                showSearch={{
                  filter,
                }}
                onSearch={(value) => console.log(value)}
              />
            </Modal>

            <Select
            style={{width:"89%", marginTop:"2rem"}}
          showSearch
          placeholder="L???a ch???n danh m???c"
          optionFilterProp="children"
          onChange={onChangeselecTB}
          onSearch={onSearchTB}
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
          <Option value="1">Danh m???c b???c 1</Option>
          <Option value="2">Danh m???c b???c 2</Option>
          <Option value="3">Danh m???c b???c 3</Option>
          <Option value="4">Danh m???c b???c 4</Option>
          
        </Select>
          <Button type="primary" style={{marginLeft:"1rem", width:"6%"}} onClick={ChonDanhMuc}> ??p d???ng  </Button>


            <Button type="primary" onClick={showModal} style={{marginTop:"1rem", width:"100%"}}>
       B???c 
      </Button>
      <Col span={24}>
            <Table columns={columns} dataSource={dataTB} onChange={onChange} />
            </Col>
     </Col>

     {/*  b???c 1 */}
        <Col  style={{marginTop:"2rem"}} span={12}>
        
        <Button type="primary" style={{ marginTop:"2rem", width: "100%"}}>T???O DANH M???C </Button>
        <Button block  style={{width: "25%", marginTop:"1rem"}}>T???o danh m???c b???c 1</Button>
        <Input.Group compact style={{marginTop:"0.5rem"}}>
        <Input style={{ width: '90%' , marginTop:"0.2rem"}} onChange={onname} placeholder="Nh???p danh m???c c???p 1" allowClear="true"></Input> 
        <Input style={{ width: '90%',marginTop:"0.2rem" }}  onChange={ontieudeweb} placeholder="Nh???p ti??u ????? Website"  allowClear="true"></Input> 
        <Input style={{ width: '90%' ,marginTop:"0.2rem"}}  onChange={ontieudegoogle} placeholder="Nh???p ti??u ????? Google"  allowClear="true"></Input> 
        <TextArea showCount maxLength={90} style={{ height: 120 ,width: '90%',marginTop:"0.2rem"}}  onChange={onmota}  allowClear="true" />
        <Input style={{ width: '90%' ,marginTop:"0.2rem", marginBottom:"0.2rem"}} placeholder="Nh???p URL "  onChange={onurl}  allowClear="true"></Input> 
        <Upload
        style={{ marginTop:"0.2rem"}}

        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '90%',
          }}
          src={previewImage}
        />
      </Modal>
    
      <Input style={{ width: '90%' ,marginTop:"0.2rem"}}   onChange={onnoidungdau}placeholder="N???i dung ?????u"  allowClear="true"></Input> 
      <Input style={{ width: '90%' ,marginTop:"0.2rem"}}  onChange={onnoidungcuoi} placeholder="N???i dung cu???i"  allowClear="true"></Input> 
      <Input style={{ width: '90%' ,marginTop:"0.2rem",marginBottom:"0.2rem"}}  onChange={ontag} placeholder="Tag" allowClear="true"></Input> 
      <Button type="primary" style={{ width: '30%'}} onClick={sumbmit01}>Th??m</Button>
      </Input.Group>
        </Col>
    
{/*  b???c 2 */}
        <Col style={{marginTop:"2rem"}} span={12}>
        <Button type="primary" style={{ marginTop:"2rem", width: "100%"}}>T???O DANH M???C </Button>
        <Button block  style={{width: "25%", marginTop:"1rem"}}>T???o danh m???c b???c 2</Button>
        <Select  style={{width:"30%", marginLeft:"1rem"}}
          showSearch
          placeholder="L???y danh m???c cha"
          optionFilterProp="children"
          onChange={onChangeSelect}
          onSearch={onSearch}
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
           { dataoption1.map(item=>{
         return(
          <Option value={item.id}   >{item.name}</Option>
          )})}
        </Select>
        <Input.Group compact style={{marginTop:"0.5rem"}}>
        <Input style={{ width: '90%' , marginTop:"0.2rem"}}   allowClear="true"  onChange={onname}  placeholder="Nh???p danh m???c c???p 2"></Input> 
        <Input style={{ width: '90%',marginTop:"0.2rem" }}   allowClear="true"  onChange={ontieudeweb}placeholder="Nh???p ti??u ????? Website"></Input> 
        <Input style={{ width: '90%' ,marginTop:"0.2rem"}}   allowClear="true"  onChange={ontieudegoogle} placeholder="Nh???p ti??u ????? Google"></Input> 
        <TextArea showCount maxLength={90}   allowClear="true" style={{ height: 120 ,width: '90%',marginTop:"0.2rem"}}  onChange={onmota} />
        <Input style={{ width: '90%' ,marginTop:"0.2rem", marginBottom:"0.2rem"}}  allowClear="true"  placeholder="Nh???p URL " onChange={onurl}></Input> 
        <Upload
        style={{ marginTop:"0.2rem"}}

        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList2}
        onPreview={handlePreview}
        onChange={handleChange2}
      >
        {fileList2.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '90%',
          }}
          src={previewImage}
        />
      </Modal>
    
      <Input style={{ width: '90%' ,marginTop:"0.2rem"}}   allowClear="true" onChange={onnoidungdau} placeholder="N???i dung ?????u"></Input> 
      <Input style={{ width: '90%' ,marginTop:"0.2rem"}}  allowClear="true"  onChange={onnoidungcuoi} placeholder="N???i dung cu???i"></Input> 
      <Input style={{ width: '90%' ,marginTop:"0.2rem",marginBottom:"0.2rem"}}  allowClear="true" placeholder="Tag" onChange={ontag}></Input> 
        <Button type="primary" style={{ width: '30%'}}   onClick={sumbmit02}  >Th??m</Button>
      </Input.Group>
        </Col>

{/*  b???c 3 */}

<Col style={{marginTop:"2rem"}} span={12}>
        <Button type="primary" style={{ marginTop:"2rem", width: "100%"}}>T???O DANH M???C </Button>
        <Button block  style={{width: "25%", marginTop:"1rem"}}>T???o danh m???c b???c 3</Button>
        <Select  style={{width:"30%", marginLeft:"1rem"}}
          showSearch
          placeholder="L???y danh m???c cha"
          optionFilterProp="children"
          onChange={onChangeSelect}
          onSearch={onSearch}
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
           { dataoption2.map(item=>{
         return(
          <Option value={item.id}   >{item.name}</Option>
          )})}
        </Select>
        <Input.Group compact style={{marginTop:"0.5rem"}}>
        <Input style={{ width: '90%' , marginTop:"0.2rem"}}  allowClear="true" onChange={onname}  placeholder="Nh???p danh m???c c???p 3"></Input> 
        <Input style={{ width: '90%',marginTop:"0.2rem" }}   allowClear="true"  onChange={ontieudeweb}placeholder="Nh???p ti??u ????? Website"></Input> 
        <Input style={{ width: '90%' ,marginTop:"0.2rem"}}   allowClear="true"  onChange={ontieudegoogle} placeholder="Nh???p ti??u ????? Google"></Input> 
        <TextArea showCount maxLength={90} style={{ height: 120 ,width: '90%',marginTop:"0.2rem"}} allowClear="true"   onChange={onmota} />
        <Input style={{ width: '90%' ,marginTop:"0.2rem", marginBottom:"0.2rem"}}  allowClear="true" placeholder="Nh???p URL " onChange={onurl}></Input> 
        <Upload
        style={{ marginTop:"0.2rem"}}

        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList3}
        onPreview={handlePreview}
        onChange={handleChange3}
      >
        {fileList3.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '90%',
          }}
          src={previewImage}
        />
      </Modal>
    
      <Input style={{ width: '90%' ,marginTop:"0.2rem"}}  allowClear="true"   onChange={onnoidungdau} placeholder="N???i dung ?????u"></Input> 
      <Input style={{ width: '90%' ,marginTop:"0.2rem"}}  allowClear="true"  onChange={onnoidungcuoi} placeholder="N???i dung cu???i"></Input> 
      <Input style={{ width: '90%' ,marginTop:"0.2rem",marginBottom:"0.2rem"}}  allowClear="true"  placeholder="Tag" onChange={ontag}></Input> 
        <Button type="primary" style={{ width: '30%'}}  onClick={sumbmit03}  >Th??m</Button>
      </Input.Group>
        </Col>
{/*  b???c 4 */}
        <Col style={{marginTop:"2rem"}} span={12}>
        <Button type="primary" style={{ marginTop:"2rem", width: "100%"}}>T???O DANH M???C </Button>
        <Button block  style={{width: "25%", marginTop:"1rem"}}>T???o danh m???c b???c 4</Button>
        <Select  style={{width:"30%", marginLeft:"1rem"}}
          showSearch
          placeholder="L???y danh m???c cha"
          optionFilterProp="children"
          onChange={onChangeSelect}
          onSearch={onSearch}
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
           { dataoption3.map(item=>{
         return(
          <Option value={item.id}   >{item.name}</Option>
          )})}
        </Select>
        <Input.Group compact style={{marginTop:"0.5rem"}}>
        <Input style={{ width: '90%' , marginTop:"0.2rem"}}  allowClear="true"  onChange={onname}  placeholder="Nh???p danh m???c c???p 4"></Input> 
        <Input style={{ width: '90%',marginTop:"0.2rem" }}  allowClear="true"   onChange={ontieudeweb}placeholder="Nh???p ti??u ????? Website"></Input> 
        <Input style={{ width: '90%' ,marginTop:"0.2rem"}}  allowClear="true"   onChange={ontieudegoogle} placeholder="Nh???p ti??u ????? Google"></Input> 
        <TextArea showCount maxLength={90} style={{ height: 120 ,width: '90%',marginTop:"0.2rem"}}  allowClear="true"  onChange={onmota} />
        <Input style={{ width: '90%' ,marginTop:"0.2rem", marginBottom:"0.2rem"}} allowClear="true" placeholder="Nh???p URL " onChange={onurl}></Input> 
        <Upload
        style={{ marginTop:"0.2rem"}}

        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList4}
        onPreview={handlePreview}
        onChange={handleChange4}
      >
        {fileList4.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '90%',
          }}
          src={previewImage}
        />
      </Modal>
    
      <Input style={{ width: '90%' ,marginTop:"0.2rem"}}   onChange={onnoidungdau}  allowClear="true" placeholder="N???i dung ?????u"></Input> 
      <Input style={{ width: '90%' ,marginTop:"0.2rem"}}  onChange={onnoidungcuoi} allowClear="true"  placeholder="N???i dung cu???i"></Input> 
      <Input style={{ width: '90%' ,marginTop:"0.2rem",marginBottom:"0.2rem"}}  allowClear="true" placeholder="Tag" onChange={ontag}></Input> 
        <Button type="primary" style={{ width: '30%'}}  onClick={sumbmit04}  >Th??m</Button>
      </Input.Group>
        </Col>



        </Row>
    
    
    </>
  )
}

export default  Them_danhmuc