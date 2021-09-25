import React, { Component } from "react";
import TacoCard from "./TacoCard";

class MyTacoList extends Component {
  render() {
    return (
      <div className="taco-list-owrap">
        
        {this.props.expTacos &&
        this.props.expTacos.length > 0 ? (
          <div>
            {this.props.expTacos.map(log => (
              <TacoCard
                {...this.props}
                key={log.id}
                id={log.id}
                taco_name={log.taco_name}
                taco_location={log.taco_location}
                taco_description={log.taco_description}
                rating={log.rating}
                tortilla={log.tortilla}
                meat={log.meat}
                cheese={log.cheese}
                salsa={log.salsa}
                created_at={log.created_at}
              />
            ))}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default MyTacoList;
