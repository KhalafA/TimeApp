import React from "react";

import EntityInfo from "./EntityTemplate";

const styles = {
  background: {
    backgroundColor: "lightgray",
    padding: 10
  },
  pad: {
    marginTop: 15
  },
  root: {
    flexGrow: 1
  },
  invoicebox: {
    maxWidth: 800,
    padding: 30,
    margin: "auto",
    borderRadius: 1,
    borderWidth: 1,
    borderColor: "#eee",
    fontSize: 16,
    lineHeight: "24px"
  },
  table: {
    width: "100%",
    lineHeight: "inherit",
    textAlign: "left"
  },
  tableData: {
    padding: 5,
    verticalAlign: "top"
  },
  headers: {
    paddingBottom: 20
  },
  right: {
    textAlign: "Right"
  },
  info: {
    display: "inline-block",
    width: "auto"
  }
};

const Invoice = props => {
  var { company, customer, invoice, notes, totalAmount } = props;

  const { items } = invoice;
  console.log("@@@");
  console.log(invoice);
  console.log("@@@");

  return InvoiceTemplate(company, customer, invoice, notes, items, totalAmount);
};

const InvoiceTemplate = (
  company,
  customer,
  invoice,
  notes,
  items,
  totalAmount
) => {
  return (
    <div style={styles.invoicebox}>
      <table style={styles.table}>
        <tbody>
          <tr>
            <td colSpan="2">
              <table style={styles.table}>
                <tbody>
                  <tr>
                    <td style={styles.headers}>
                      <div>Bill From</div>
                      <EntityInfo entity={company} />
                    </td>
                    <td style={{ ...styles.headers, ...styles.right }}>
                      <img
                        src={company.logoUrl}
                        style={{ width: "100%", maxWidth: "200px" }}
                        alt={company.name}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ paddingBottom: 40 }}>
              <table style={styles.table}>
                <tbody>
                  <tr>
                    <td>
                      <div>Bill To</div>
                      <EntityInfo entity={customer} />
                    </td>
                    <td styles={styles.right}>
                      <table styles={styles.info}>
                        <tbody>
                          <tr>
                            <td>Invoice #</td>
                            <td>{invoice.id}</td>
                          </tr>
                          {invoice.paymentMethod && (
                            <tr>
                              <td style={{ paddingRight: 10 }}>
                                Payment Method
                              </td>
                              <td>{invoice.paymentMethod}</td>
                            </tr>
                          )}
                          <tr>
                            <td>Created</td>
                            <td>{invoice.createdDate}</td>
                          </tr>
                          {invoice.paidDate && (
                            <tr>
                              <td>Paid</td>
                              <td>{invoice.paidDate}</td>
                            </tr>
                          )}
                          {invoice.dueDate && !invoice.paidDate && (
                            <tr>
                              <td>Due</td>
                              <td>{invoice.dueDate}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          {invoice.description && [
            <tr>
              <td colSpan="2">Description</td>
            </tr>,
            <tr>
              <td colSpan="2">{invoice.description}</td>
            </tr>
          ]}
          <tr />
          {items.map(item => (
            <tr key={item.title}>
              <td>{item.title}</td>
              <td>{item.time} </td>
            </tr>
          ))}
          <tr>
            <td />
            <td styles={styles.right}>
              <table style={styles.table}>
                <tbody>
                  <tr>
                    <td>Total</td>
                    <td>{totalAmount} Kr</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      {notes && (
        <div style={{ marginTop: 30 }}>
          <div>Notes</div>
          {notes}
        </div>
      )}
    </div>
  );
};

export default Invoice;
