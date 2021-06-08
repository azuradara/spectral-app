import React, { useReducer } from 'react';
import * as DEEDS from '../../../lib/helpers/deeds';
import * as inputReducer from '../../../lib/reducers/inputReducer';

const Signup = () => {
  const [inputState, inputDispatch] = useReducer(
    inputReducer.inputReducer,
    inputReducer.initialState,
  );

  const handleInputChange = (e) => {
    inputDispatch(DEEDS.input_change(e.target.value));
  };

  return (
    <div className="signup">
      <h2>signup</h2>

      <form>
        <label>
          <p>Name</p>
          <input type="text" required onChange={handleInputChange} />
        </label>

        <label>
          <p>Username</p>
          <input type="text" required onChange={handleInputChange} />
        </label>

        <label>
          <p>E-Mail</p>
          <input type="text" required />
        </label>

        <label>
          <p>Password</p>
          <input type="text" required />
        </label>

        <label>
          <p>Confirm Password</p>
          <input type="text" required />
        </label>

        <button>signup</button>
      </form>

      {inputState.input_change}
    </div>
  );
};

export default Signup;
