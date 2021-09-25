import React, { useEffect, useState } from "react";
import Typography from '@material-ui/core/Typography';

const FinalStep =  props => {
    const {id, history} = props;
    const [timer, setTimer] = useState(10);
    const time = timer > 1 ? 'seconds' : 'second';

  useEffect( () => {
    if (timer) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      history.push(`/user/${id}/dashboard`);
    }
  }, [timer]);
    return (
        <>
            <Typography variant="h5" gutterBottom>
                Thanks for setting things up.
            </Typography>
            <Typography variant="subtitle1">
                Now you can start invoicing in our app by selecting your company in the dropdown above.
                You'll be redirected to the dashboard in <b>{timer} {time}</b>.
            </Typography>
        </>
        
    )
}

export default FinalStep;