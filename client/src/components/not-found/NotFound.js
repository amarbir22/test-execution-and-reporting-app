import React from 'react';
import Figure from 'react-bootstrap/Figure';
import { Link } from 'react-router-dom';
import image from '../../../public/static/images/page-not-found-4.png';


export default () => (
  <div className="container py-md-4 not-found">
    <div className="page-wrap d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <div className="container">
              <Figure>
                <Figure.Image
                  width={171}
                  height={180}
                  alt="171x180"
                  src={image}
                />
                <Figure.Caption>
                  The page you are looking for was not found.
                </Figure.Caption>
              </Figure>
            </div>
            <span className="display-1 d-block">404</span>
            <Link to="/" className="btn btn-link">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);
