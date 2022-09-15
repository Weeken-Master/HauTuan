import React,{useState,useEffect} from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Steps } from 'antd';

const { Step } = Steps;
function Update_Product() {

    const [current, setcurrent] = useState(1)
    const[xstatus,setxstatus] = useState("wait")


  return (
    <div>
        
    <Steps current={0} labelPlacement="vertical" status='finish'>
      <Step title="Finished" description="This is a description."  />
      <Step status="process" title="Pay" icon={<LoadingOutlined />} />
      <Step title="Finished" description="This is a description." />
    </Steps>
    </div>
  )
}

export default Update_Product