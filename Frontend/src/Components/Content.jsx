import React, { useState } from "react";
import Home from "./Home/HomeContent";
import Client from "./Client/ClientContent";
import Project from "./Project/ProjectContent";
import Invoice from "./Invoice/InvoiceContent";

const Content = props => {
  const [page, setPage] = useState({ page: "Home" });

  const handleTabs = event => {
    setPage({ page: event.target.value });
  };

  const getPage = () => {
    console.log(page);

    if (page.page === "Home") {
      return <Home />;
    } else if (page.page === "Invoice") {
      return <Invoice />;
    } else if (page.page === "Projects") {
      return <Project />;
    } else if (page.page === "Clients") {
      return <Client />;
    }
  };

  const styles = {
    center: {
      textAlign: "center"
    }
  };

  return (
    <div className="col-md-6" style={styles.center}>
      <h3> Time tracker - {props.name}</h3>

      <div>
        <button value={"Home"} onClick={handleTabs}>
          Home
        </button>
        <button value="Invoice" onClick={handleTabs}>
          Invoices
        </button>
        <button value="Projects" onClick={handleTabs}>
          Projects
        </button>
        <button value="Clients" onClick={handleTabs}>
          Clients
        </button>

        {getPage()}
      </div>
    </div>
  );
};

export default Content;
