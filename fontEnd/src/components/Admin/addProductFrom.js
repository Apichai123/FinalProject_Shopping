import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./addProductModel.css";
import { Link } from "react-router-dom";
import Axios from "../../config/axios.setup";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Upload,
  message
} from "antd";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake"
          }
        ]
      }
    ]
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men"
          }
        ]
      }
    ]
  }
];

class AddProductFrom extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    fileList: [],
    productcategories:[],
    productcategoriesID:0
  };

  handleSubmit = e => {
    e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });
  };

  handleSelectChange = value => {
    
    this.setState({productcategoriesID:value})


    // this.props.form.setFieldsValue({
    //   note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    // });
  };

  handleSubmit = e => {
    e.preventDefault();
    
    this.props.form.validateFieldsAndScroll((err, value) => {
      let payload = new FormData();
      //alert(value.productname)
      //alert(this.state.productcategoriesID)
      payload.append("name", value.productname);
      payload.append("photoPost", this.state.fileList[0]);
      payload.append("description", value.description);
      payload.append("price", value.price);
      payload.append("ProductCategoryId", this.state.productcategoriesID);
  
      console.log(payload);
      if (!err) {
        Axios.post("/create-product", payload)
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            console.error(err);
          });
        this.props.form.resetFields();
      }
    });
  };

  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  componentDidMount(){

       //alert("OK")
       Axios.get('/getproduct-category')
       .then(result => {
         console.log(result.data)
        this.setState({productcategories:result.data})
         
       })
       .catch(err => {
         console.error(err);
        
       })

  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const { fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        })
        );
        return false;
      },
      fileList
    };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };


    return (
      <div className="test">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label={
              <span>
                Product Name&nbsp;
                <Tooltip title="Product Name">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("productname", {
              rules: [
                {
                  required: true,
                  message: "Please input product name!",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Upload" extra="Select file image">
            {getFieldDecorator("upload", {
              valuePropName: "fileList",
              getValueFromEvent: this.normFile
            })(
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> Select File
                </Button>
              </Upload>
            )}
          </Form.Item>

          <Form.Item
            label={
              <span>
                Description&nbsp;
                <Tooltip title="Description">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("description", {
              rules: [
                {
                  required: true,
                  message: "Please input Description",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>

          <Form.Item
            label={
              <span>
                price&nbsp;
                <Tooltip title="Price">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("price", {
              rules: [
                {
                  required: true,
                  message: "Please input price number",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>

  
        <Form.Item label="Product Category">
          {getFieldDecorator('product-category', {
            rules: [{ required: true, message: 'Please select product category' }],
          })(
            <Select
              placeholder="Select product category"
              onChange={this.handleSelectChange}
            >
              {this.state.productcategories.map(category=>(<Option key={category.id} value={category.id}>{category.name}</Option>))}
              {/* <Option value="Black">Black</Option>
              <Option value="Black-Pink">Black-Pink</Option> */}
            </Select>,
          )}
        </Form.Item>


          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              <b>Add</b>
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedAddProductFrom = Form.create({ name: "addproduct" })(
  AddProductFrom
);

export default WrappedAddProductFrom;
