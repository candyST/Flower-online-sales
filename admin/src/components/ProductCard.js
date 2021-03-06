import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import ProductsDelete from "./ProductsDelete";
import "../styles/productCard.css";
import Zmage from "react-zmage";

class ProductCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="card mb-3 ">
        <div className="row no-gutters">
          <div className="col-sm-3 col-3 suit">
            <img
              className="rosepic img-fluid"
              browsing={false}
              src={
                process.env.REACT_APP_THUMB_URL + this.props.picture + ".jpg"
              }
              alt="加载中..."
              onClick={() =>
                Zmage.browsing({
                  src: process.env.REACT_APP_ORIGIN_URL + this.props.picture,
                  alt: "加载中..."
                })
              }
            />
          </div>
          <div className="col-sm-8 col-8 ">
            <div className="card-body">
              <h5 className="card-title ">{this.props.name}</h5>
              <p className="card-text intro">{this.props.brief}</p>
            </div>
          </div>
        </div>
        <div className="buy d-flex flex-row">
          <div className="number col-sm-8 col-8 d-flex flex-row justify-content-between">
            <div className="row-price">
              <p className="price">¥ {this.props.price}.00</p>
            </div>
            <div className="row-stock">
              <p className="stock ">库存 {this.props.stock} 扎</p>
            </div>
          </div>

          <div className="operate col-sm-4 col-4">
            <div className="update">
              <Link to={"/products/update/" + this.props.id}>编辑</Link>
            </div>
            <div className="delete">
              <ProductsDelete deleteId={this.props.id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
