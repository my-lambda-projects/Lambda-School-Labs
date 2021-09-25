import React, { Component } from "react";
import SpecialTacoCard from "./SpecialTacoCard";
import "../css/GlobalTacoList.css";
class GlobalTacoList extends Component {
  render() {
    return (
      <div className="special-taco-list-owrap">
        
        {this.props.tacoInfo &&
        this.props.tacoInfo.length > 0 ? (
          <div className="special-taco-list-group">
            {this.props.tacoInfo.map(log => (
              <SpecialTacoCard
                {...this.props}
                key={log.id}
                id={log.id}
                name={log.name}
                taco_location={log.taco_location}
                taco_description={log.taco_description}
                taco_name={log.taco_name}
                rating={log.rating}
                tortilla={log.tortilla}
                meat={log.meat}
                cheese={log.cheese}
                salsa={log.salsa}
                created_at={log.created_at}
                special_experience={log.special_experience}
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

export default GlobalTacoList;
