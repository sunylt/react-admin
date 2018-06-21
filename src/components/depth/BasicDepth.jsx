import React, { Component } from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Table, Icon, Row, Col } from 'antd';

class BasicDepth extends Component {
  componentDidMount() {
    fetch("https://api.aiex.one/api/depths/all", {method: "GET"})
      .then(res => res.json())
      .then(json => {
        console.log(json)
      })
  }
  render() {
    return (
      <div className="gutter-example">
        <Row gutter={16}>
        <Col className="gutter-row" md={24}>
        <BreadcrumbCustom first="深度监测" />

        <BasicTable />     
        </Col>
            
        </Row>
      </div>
    )
  }
}

const columns = [{
    title: '交易对',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
}, {
    title: '平台',
    dataIndex: 'age',
    key: 'age',
    render: () => {
        return (
            <div><p>BINANCE</p><p>HUOBI</p></div>
        )
    }
}, {
    title: '请求时间',
    dataIndex: 'address',
    key: 'address',
}, {
    title: '服务器时间',
    dataIndex: "time",
    key: 'time',
}, {
    title: "挂单价格",
    key: "price",
    render: () => {
        return (
            <div>
                <p><span className="ask-first">卖</span>0.07926600 <span className="bid-first">买</span>0.07927500</p>
                <p><span className="ask-first">卖</span>0.07926600 <span className="bid-first">买</span>0.07927500</p>
            </div>
        )
    }
}, {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: () => {
        return (
            <div>
                <span className="status-ok" /><br />
                <span className="status-error" />
            </div>
        )
    }
}];

const data = [{
    key: '1',
    name: 'ADA/BTC',
    age: 32,
    address: '2018-06-19 16:06:08',
    time: "2018-06-19 16:06:08-a",
    status: "11"
}, {
    key: '2',
    name: 'ADA/ETH',
    age: 42,
    address: '2018-06-19 16:06:08',
}, {
    key: '3',
    name: 'ADA/USDT',
    age: 32,
    address: '2018-06-19 16:06:08',
}];

const BasicTable = () => (
    <Table columns={columns} dataSource={data} />
);

export default BasicDepth