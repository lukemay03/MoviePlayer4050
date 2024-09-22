import React from 'react';
import Header from './components/Header';
import { Link } from 'react-router-dom';
function AddMovie() {
    return (
    <form>
      <label>Enter Movie Name:
        <input type="text" />
      </label>
      <label>Enter Cast:
        <input type="text" />
      </label>
      <label>Enter Category:
        <input type="text" />
      </label>
      <label>Enter director:
        <input type="text" />
      </label>
      <label>Enter Producer:
        <input type="text" />
      </label>
      <label>Enter synopsis:
        <input type="text" />
      </label>
      <label>Enter trailer picture path(optional):
        <input type="text" />
      </label>
      <label>Enter trailer link:
        <input type="text" />
      </label>
      <label>Enter movie rating:
        <input type="text" />
      </label>
      <label>Enter Current_running:
        <div>
          <input type="radio" id="radio1" value="True" />
          <label for="radio1">True</label>

          <input type="radio" id="radio2" value="False" />
          <label for="radio2">False</label>
        </div>
      </label>
    </form>
    );
}

export default AddMovie;