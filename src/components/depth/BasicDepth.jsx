import React, { Component } from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Table, Spin, Row, Col } from 'antd';
import {parsePairs} from "@/utils/"

const columns = [{
    title: '交易对',
    dataIndex: 'pairs',
    key: 'pairs',
    render: (pairs, item) => {
        return (<a>{ pairs }</a>)
    },
}, {
    title: '平台',
    dataIndex: 'data',
    key: 'platform',
    render: (data) => {
        return (
            <div>{Object.keys(data).map(platform => <p key={platform}>{platform.toUpperCase()}</p>)}</div>
        )
    }
}, {
    title: '请求时间',
    dataIndex: 'data',
    key: 'requestTime',
    render: (data) => {
        return (
            <div>
                {
                    Object.keys(data).map(platform => <p key={platform}>{data[platform].E}</p>)
                }
            </div>
        )
    }
}, {
    title: '服务器时间',
    dataIndex: "data",
    key: 'time',
    render: (data) => {
        return (
            <div>
                {
                    Object.keys(data).map(platform => <p key={platform}>{data[platform].time}</p>)
                }
            </div>
        )
    }
}, {
    title: "挂单价格",
    dataIndex: "data",
    key: "price",
    render: (data) => {
        return (
            <div>
                {
                    Object.keys(data).map(platform => <p key={platform}><span className="ask-first">卖</span>{Number(data[platform].asks).toFixed(8)} <span className="bid-first">买</span>{Number(data[platform].bids).toFixed(8)}</p>)
                }
            </div>
        )
    }
}, {
    title: "状态",
    dataIndex: "data",
    key: "status",
    render: (data) => {
        return (
            <div>
                {Object.keys(data).map(platform => <p key={platform}>{data[platform].state ? <span className="status-ok" /> : <span className="status-error" />}</p>)}    
            </div>
        )
    }
}];

class BasicDepth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this.requestDepths()
        setInterval(this.requestDepths, 1500)
    }
    requestDepths = () => {
        const that = this
        fetch("https://api.aiex.one/api/depths/all/", {method: "GET"})
            .then(res => res.json())
            .then(res => {
                if (res.status) {
                    let data = []
                    Object.keys(res.data).forEach((pairs, index) => {
                        data.push({pairs: parsePairs(pairs), data: res.data[pairs], key: index})
                    })
                    that.setState({ data })
                }
            })
    }
    render() {
        return (
            <div className="gutter-example">
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <BreadcrumbCustom first="深度监测" />
                        <Table columns={columns} dataSource={this.state.data} />    
                        <Spin size="small" />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default BasicDepth