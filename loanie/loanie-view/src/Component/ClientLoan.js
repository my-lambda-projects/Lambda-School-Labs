import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Navbar from './Navbar';

export default function MyLoans() {
  return (
    <div className="MyLoans">
      <div className="BreadCrumb">
        <Breadcrumb>
          <BreadcrumbItem tag="a" href="/">
            Home
          </BreadcrumbItem>
          <BreadcrumbItem active>Loans</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Navbar />
    </div>
  );
}
