import React, { PureComponent } from "react";
import "../styles/card.css";
import { Link } from "react-router-dom";

class Card extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="card gap">
          <div className="card-header d-flex flex-row justify-content-between">
            <button className="btn btn-link" type="button">
              {this.props.name}
            </button>
            <div className="update">
              <Link to={"/categories/update/" + this.props.openId}>编辑</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
