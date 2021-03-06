import React, { PureComponent } from "react";
import "../styles/client.css";
import * as wxpay from '../actions/wxpay';

var name = localStorage.getItem("Name");
var Tel = localStorage.getItem("Tel");
var Province = localStorage.getItem("Province");
var City = localStorage.getItem("City");
var Area = localStorage.getItem("Area");
var Address = localStorage.getItem("Address");

class Client extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isClickable: true,
      clientName: name,
      clientTel: Tel,
      clientProvince: Province,
      clientCity: City,
      clientArea: Area,
      clientAddress: Address,
      clientText: ""
    };
  }
  _changeValue = e => {
    switch (e.target.name) {
      case "clientName":
        this.setState(
          {
            clientName: e.target.value
          },
          () => window.localStorage.setItem("Name", this.state.clientName)
        );
        break;
      case "clientTel":
        this.setState(
          {
            clientTel: e.target.value
          },
          () => window.localStorage.setItem("Tel", this.state.clientTel)
        );
        break;
      case "clientProvince":
        this.setState(
          {
            clientProvince: e.target.value
          },
          () =>
            window.localStorage.setItem("Province", this.state.clientProvince)
        );
        break;
      case "clientCity":
        this.setState(
          {
            clientCity: e.target.value
          },
          () => window.localStorage.setItem("City", this.state.clientCity)
        );
        break;
      case "clientArea":
        this.setState(
          {
            clientArea: e.target.value
          },
          () => window.localStorage.setItem("Area", this.state.clientArea)
        );
        break;
      case "clientAddress":
        this.setState(
          {
            clientAddress: e.target.value
          },
          () => window.localStorage.setItem("Address", this.state.clientAddress)
        );
        break;
      case "clientText":
        this.setState({
          clientText: e.target.value
        });
        break;
      default:
        break;
    }
  };

  handleClick = async e => {
    e.preventDefault();
    const orderItems = this.props.orderItems.filter(a => a.number > 0)
    if (orderItems.length < 1) {
      alert('请选购有效的商品')
      return
    }
    try {
      this.setState({ isClickable: false });
      await wxpay.pay({
        clientName: this.state.clientName,
        clientTel: this.state.clientTel,
        clientProvince: this.state.clientProvince,
        clientCity: this.state.clientCity,
        clientArea: this.state.clientArea,
        clientAddress: this.state.clientAddress,
        clientText: this.state.clientText,
        orderItems: this.props.orderItems.filter(a => a.number > 0)
      }, {
        success: (res) => {
          localStorage.removeItem("cart");
          this.setState({
            successMsg: '订单支付成功，我们会尽快给您安排发货，有任何问题请联系客服，谢谢！'
          }, () => {
            setTimeout(() => {
              this.setState({
                successMsg: ''
              });
            }, 3000);
          })
          this.props.cleanCart && this.props.cleanCart()
        },
        fail: (res) => {
          this.setState({
            errorMsg: '订单支付失败，若有任何问题请联系客服，谢谢！'
          }, () => {
            this.setState({
              errorMsg: ''
            })
          })
        }
      })
    } catch (error) {
      alert(error.message);
    } finally {
      this.setState({ isClickable: true });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleClick}>
          <div className="form-group client-information">
            <label htmlFor="exampleInput1" className="client-name">
              姓名
            </label>

            <input
              value={this.state.clientName}
              name="clientName"
              onChange={this._changeValue}
              required="required"
              type="text"
              className="form-control"
              id="exampleInput1"
              aria-describedby="emailHelp"
              placeholder="姓名"
            />
          </div>
          <div className="form-group client-information d-flex flex-column">
            <label htmlFor="exampleInput2" className="client-name">
              手机号码
            </label>
            <label htmlFor="exampleInput2" className="client-title">
              请准确填写联系方式，以免耽误配送签收！
            </label>

            <input
              value={this.state.clientTel}
              name="clientTel"
              onChange={this._changeValue}
              type="number"
              required
              className="form-control"
              id="exampleInput2"
              placeholder="请填写正确号码"
            />
          </div>

          <div className="address-contain ">
            <div className="">
              <div className="address-title d-flex flex-column">
                <label className=" instruction">地址</label>
                <label className=" post-title">请尽量详细收货地址信息</label>
              </div>
              <div className="address-select" data-toggle="distpicker">
                <select
                  data-province={this.state.clientProvince}
                  name="clientProvince"
                  onChange={this._changeValue}
                  className="custom-select col-sm-4 col-4"
                  id="inlineFormCustomSelect1"
                ></select>

                <select
                  data-city={this.state.clientCity}
                  name="clientCity"
                  onChange={this._changeValue}
                  className="custom-select col-sm-4 col-4 "
                  id="inlineFormCustomSelect2"
                ></select>

                <select
                  data-district={this.state.clientArea}
                  name="clientArea"
                  onChange={this._changeValue}
                  className="custom-select col-sm-4 col-4"
                  id="inlineFormCustomSelect3"
                ></select>
              </div>
              <div className="client-information">
                <input
                  value={this.state.clientAddress}
                  name="clientAddress"
                  onChange={this._changeValue}
                  required
                  type="text"
                  className="form-control"
                  id="exampleInput4"
                  aria-describedby="emailHelp"
                  placeholder="详细地址"
                />
              </div>

              <div className="form-group client-information ">
                <label
                  className="client-name "
                  htmlFor="exampleFormControlTextarea1"
                >
                  备注
                </label>
                <textarea
                  name="clientText"
                  onChange={this._changeValue}
                  className="form-control "
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>
          <p className='text-success paid-message'>{this.state.successMsg}</p>
          <p className='text-danger paid-message'>{this.state.errorMsg}</p>
          <button
            disabled={!this.state.isClickable}
            className="btn btn-success btn-lg btn-block order-btn text-light"
          >
            {this.state.isClickable ? '确认下单' : '正在生成订单...'}
          </button>
        </form>
      </div>
    );
  }
}

export default Client;
