/* 
        Name: Ilyes Abdellatif Bouazza
        Email : ilyesabdellatif_bouazza@student.uml.edu
        University: UMass Lowell
        Class: GUI 1 Fall 2024
        Homework 3: Create Multiplication Table
        FILE : main.js 
        */

// Get the form
const form = document.getElementById('form');

// Get all input elements in the form
const inputs = form.querySelectorAll('input[type="text"]');

//Get all error labels next to each input text
const error_labels = form.querySelectorAll('.error');

//get the generate button object
const generate_btn = document.getElementById('generate-btn');
//get the reset button object
const reset_btn = document.getElementById('reset-btn');

// constants class,all memmbers are static so we can have them without an object
class CONSTANTS {
    //min and max values for rows and columns
    static MIN_COLUMN_VALUE = -100;
    static MAX_COLUMN_VALUE = 100;
    static MIN_ROW_VALUE = -100;
    static MAX_ROW_VALUE = 100;

    //indices based on user input order
    static MIN_COLUMN_INPUT_INDEX = 0;
    static MAX_COLUMN_INPUT_INDEX = 1;
    static MIN_ROW_INPUT_INDEX = 2;
    static MAX_ROW_INPUT_INDEX = 3;

}

// Using this class we can have our object that is constructed using min and columns, min and max rows
class Multiplication_Table {
    // a constructor that has four parmeters min and max columns
    //once we gell the four parmeters we calculate the size of the row and column
    //Finally we fill our matrix with data based on the four parameters
    //to generate data for the matrix,we use populate_matrix function 
    constructor(min_column, max_column, min_row, max_row) {
        this.min_column = min_column;
        this.max_column = max_column;
        this.min_row = min_row;
        this.max_row = max_row;
        this.row_size = this.max_row - this.min_row + 1;
        this.column_size = this.max_column - this.min_column + 2;
        this.matrix = this.populate_matrix();
    }
    //this function will return the multiolication table which is a 2d array
    populate_matrix() {
        let matrix = [];
        //create header row
        let header_row = [];
        //matrix[0][0] is the sign of multiplication X
        header_row.push('X');
        //fill the first row with column values from min to max
        for (let j = this.min_column; j <= this.max_column; j++) {
            header_row.push(j);
        }
        //push the first row with column values from max to min
        matrix.push(header_row);

        //we fill out the rest of rows by multiplying each column by the first column in the same row 
        //we do the same for all the rows from min to max values
        //once we fill the rows we push it back into the matrix
        for (let i = this.min_row; i <= this.max_row; i++) {

            let row = [];
            row.push(i);
            for (let j = this.min_column; j <= this.max_column; j++) {
                row.push(i * j);

            }
            matrix.push(row);
        }
        //we return the 2d matrix
        return matrix;
    }

    // a function to display the multiplcation table into the console for testing purpuses
    print_matrix() {
        let r = this.row_size;
        let c = this.column_size;
        console.log(r);
        console.log(c);
        for (let i = 0; i < this.row_size; i++) {
            let rowOutput = ''; // Reset for each row
            for (let j = 0; j < this.column_size; j++) {
                rowOutput += `${this.matrix[i][j]} \t`; // Access matrix
            }
            console.log(rowOutput.trim()); // Trim and print the row
        }
    }
    //a getter for the matrix
    get_matrix() { return this.matrix; }

}


//a class only for UI that has two static methods 
class HTML_DISPLAY {


    //onstructs an HTML table from a 2D array (matrix), using the first row as the table header
    //and alternating row styles with CSS classes for each row. The first column in each row 
    //is used as a header cell, creating a structured and styled table.
    //Begin with an empty HTML string and add the `<table>` opening tag.
    //Loop through each row of the `matrix`:
    //If it’s the first row (header row):
    //Open `<thead><tr>`.
    //Loop through each cell in the header row, wrapping each cell in `<th>` tags.
    //Close `</tr></thead>` and open `<tbody>` for the main content rows.
    //For all other rows:
    //Determine a CSS class based on the row index (even/odd for alternate styling).
    //Add a new `<tr>` with the CSS class.
    //For each cell in the row:
    //If it’s the first cell, wrap it in `<th>` to designate it as a row header.
    //Otherwise, wrap each cell in `<td>`.
    //Close the `<tr>` tag for the row.
    //Close the `</tbody></table>` tags.
    //Return the constructed HTML string.

    static construct_table(matrix) {
        let html = "";
        html += "<table>";

        for (let i = 0; i < matrix.length; i++) {
            // If it's the first row, treat it as a header
            if (i === 0) {
                html += "<thead><tr>";
                for (let j = 0; j < matrix[i].length; j++) {
                    html += `<th>${matrix[i][j]}</th>`;
                }
                html += "</tr></thead><tbody>";
            } else {
                // Add class based on the row index for alternation
                const rowClass = i % 2 === 0 ? "even-row" : "odd-row";
                html += `<tr class="${rowClass}">`; // Add the row with the class
                for (let j = 0; j < matrix[i].length; j++) {
                    if (j === 0) {
                        // First column as header
                        html += `<th>${matrix[i][j]}</th>`;
                    } else {
                        html += `<td>${matrix[i][j]}</td>`;
                    }
                }
                html += "</tr>";
            }
        }

        html += "</tbody></table>";
        return html;
    }

    //Checks if the container element is valid:
    //If `container` is `null` or `undefined`, logs an error message to the console
    //and exits the function to prevent further execution.
    //If the container is valid, sets its `innerHTML` property to `html_content`,
    //effectively updating the container’s displayed content with the provided HTML.

    static display_content(container, html_content) {
        if (!container) {
            console.error("Container not found");
            return;
        }
        container.innerHTML = html_content;
    }

}

// A class for input validation only
class INPUT_VALIDATION {
    static EMPTY_ERROR_MESSAGE = "Please fill out this field."
    static NOT_INTEGER_ERROR_MESSAGE = "Please enter a valid integer."
    static NOT_IN_RANGE_ERROR_MESSAGE = `Value must be between ${CONSTANTS.MIN_ROW_VALUE} and ${CONSTANTS.MAX_ROW_VALUE}`
    static MIN_COLUMN_VALUE_MUST_BE_LESS_THAN_OR_EQUAL_TO_MAX_COLUMN_ERROR_ESSAGE = "Min column value must be less than or equal to max column value";
    static MIN_ROW_VALUE_MUST_BE_LESS_THAN_OR_EQUAL_TO_MAX_ROW_ERROR_MESSAGE = "Min row value must be less than or equal to max row value";
    static is_empty(input) {
        return input === "";
    }

    static is_null(input) {
        return input === null;
    }

    static is_integer(input) {
        return Number.isInteger(Number(input));
    }
    static is_within_range(input, min, max) {
        return (input >= min && input <= max);
    }

    static is_less_than_or_equal_to(lhs, rhs) {
        return lhs <= rhs;
    }
}

//function to validate one input
/**
 * Validates a single input field and returns an appropriate error message if validation fails.
 *
 * Function Workflow:
 * 1. Initializes `error_message` as an empty string.
 * 2. Checks if the input is empty:
 *    - If true, appends `INPUT_VALIDATION.EMPTY_ERROR_MESSAGE` to `error_message`.
 * 3. If the input is not empty, checks if it’s an integer:
 *    - If false, appends `INPUT_VALIDATION.NOT_INTEGER_ERROR_MESSAGE` to `error_message`.
 * 4. If the input is an integer, verifies it falls within the acceptable range defined by
 *    `CONSTANTS.MIN_ROW_VALUE` and `CONSTANTS.MAX_ROW_VALUE`:
 *    - If not within range, appends `INPUT_VALIDATION.NOT_IN_RANGE_ERROR_MESSAGE` to `error_message`.
 * 5. Returns the `error_message`, which remains empty if all validations pass.
 */
function is_valid_input(input) {
    let error_message = "";
    if (INPUT_VALIDATION.is_empty(input)) {
        error_message += INPUT_VALIDATION.EMPTY_ERROR_MESSAGE;
    }
    else {
        if (!INPUT_VALIDATION.is_integer(input)) {
            error_message += INPUT_VALIDATION.NOT_INTEGER_ERROR_MESSAGE;
        }
        else {
            if (!INPUT_VALIDATION.is_within_range(input, CONSTANTS.MIN_ROW_VALUE, CONSTANTS.MAX_ROW_VALUE)) {
                error_message += INPUT_VALIDATION.NOT_IN_RANGE_ERROR_MESSAGE;
            }
        }
    }
    return error_message;
}

//validates all the inputs before generating the table
function validate_inputs() {
    /**
 * Validates an array of inputs, highlights valid/invalid inputs, and displays error messages.
 *
 * 1. Initialize `all_inputs_are_valid` to `true`, assuming all inputs will pass validation.
 * 2. Loop through each input in the `inputs` array:
 *    - Reset any existing highlight for the current input by calling `reset_input_highlight(i)`.
 *    - Trim whitespace from the input's value and validate it using `is_valid_input`.
 *    - If the validation returns an error message:
 *      - Log the input index and error message.
 *      - Set `all_inputs_are_valid` to `false` since validation failed.
 *      - Highlight the input as invalid using `highlight_invalid_input(i)`.
 *      - Display the specific `error_message` with `display_error_message(i, error_message)`.
 *    - If no error message is returned (validation passed):
 *      - Log the input index and empty error message.
 *      - Highlight the input as valid using `highlight_valid_input(i)`.
 *      - Clear any displayed error label with `clear_error_label(i)`.
 */
    let all_inputs_are_valid = true;
    for (let i = 0; i < inputs.length; i++) {
        reset_input_highlight(i);
        let error_message = is_valid_input(inputs[i].value.trim());
        if (!INPUT_VALIDATION.is_empty(error_message)) {
            console.log(i, error_message);
            all_inputs_are_valid = false;
            highlight_invalid_input(i);
            display_error_message(i, error_message);
        }
        else {
            console.log(i, error_message);
            highlight_valid_input(i);
            clear_error_label(i);
        }


    }

    //After we got out of the obove loop now all the inputs are valid integer numbers 
    /**
     * After confirming all inputs are valid integers, performs range validation to ensure that:
     * 1. The minimum column value is less than or equal to the maximum column value.
     * 2. The minimum row value is less than or equal to the maximum row value.
     *
     * 1. Checks if `all_inputs_are_valid` is `true`:
     *    - Logs a confirmation message and initializes `range_error_message` as an empty string.
     *    - Retrieves and trims values for minimum and maximum column and row inputs.
     * 2. Validates the minimum and maximum column values:
     *    - If `min_column` is not less than or equal to `max_column`, logs a console message and:
     *      - Sets `all_inputs_are_valid` to `false`.
     *      - Updates `range_error_message` with the specific error message.
     *      - Highlights both minimum and maximum column inputs as invalid.
     *      - Displays the error message next to the minimum column input.
     * 3. Validates the minimum and maximum row values:
     *    - If `min_row` is not less than or equal to `max_row`, logs a console message and:
     *      - Sets `all_inputs_are_valid` to `false`.
     *      - Updates `range_error_message` with the specific error message.
     *      - Highlights both minimum and maximum row inputs as invalid.
     *      - Displays the error message next to the minimum row input.
     */
    if (all_inputs_are_valid) {
        let range_error_message = "";
        console.log("all inputs are valid");
        let min_column_text_input = inputs[CONSTANTS.MIN_COLUMN_INPUT_INDEX].value.trim();
        let max_column_text_input = inputs[CONSTANTS.MAX_COLUMN_INPUT_INDEX].value.trim();

        let min_row_text_input = inputs[CONSTANTS.MIN_ROW_INPUT_INDEX].value.trim();
        let max_row_text_input = inputs[CONSTANTS.MAX_ROW_INPUT_INDEX].value.trim();

        //check column 
        if (!INPUT_VALIDATION.is_less_than_or_equal_to(Number.parseInt(min_column_text_input), Number.parseInt(max_column_text_input))) {
            console.log("min column is not less than or equal to max");
            all_inputs_are_valid = false;
            range_error_message = "";
            range_error_message += INPUT_VALIDATION.MIN_COLUMN_VALUE_MUST_BE_LESS_THAN_OR_EQUAL_TO_MAX_COLUMN_ERROR_ESSAGE;

            reset_input_highlight(CONSTANTS.MIN_COLUMN_INPUT_INDEX);
            highlight_invalid_input(CONSTANTS.MIN_COLUMN_INPUT_INDEX);

            reset_input_highlight(CONSTANTS.MAX_COLUMN_INPUT_INDEX);
            highlight_invalid_input(CONSTANTS.MAX_COLUMN_INPUT_INDEX);

            display_error_message(CONSTANTS.MIN_COLUMN_INPUT_INDEX, range_error_message);

        }
        //check rows
        if (!INPUT_VALIDATION.is_less_than_or_equal_to(Number.parseInt(min_row_text_input), Number.parseInt(max_row_text_input))) {
            console.log("min row is not less than or equal max row");
            all_inputs_are_valid = false;
            range_error_message = "";
            range_error_message += INPUT_VALIDATION.MIN_ROW_VALUE_MUST_BE_LESS_THAN_OR_EQUAL_TO_MAX_ROW_ERROR_MESSAGE;

            reset_input_highlight(CONSTANTS.MIN_ROW_INPUT_INDEX);
            highlight_invalid_input(CONSTANTS.MIN_ROW_INPUT_INDEX);

            reset_input_highlight(CONSTANTS.MAX_ROW_INPUT_INDEX);
            highlight_invalid_input(CONSTANTS.MAX_ROW_INPUT_INDEX);

            display_error_message(CONSTANTS.MIN_ROW_INPUT_INDEX, range_error_message);

        }




    }
    //true if all inputs are valid,false if one of them is invalid
    return all_inputs_are_valid;
}

/**
 * Displays an error message in the label at the specified index.
 * 1. Accesses the label element in the `error_labels` array using `label_index`.
 * 2. Sets the `textContent` of the label to `error_message`, which displays the error message to the user.
 */
function display_error_message(label_index, error_message) {
    error_labels[label_index].textContent = error_message;
}

/**
 * Clears the error message displayed in the specified label.
 * 1. Accesses the label element in the `error_labels` array at the given `label_index`.
 * 2. Sets the `textContent` of the label to an empty string, effectively removing any displayed error message.
 */
function clear_error_label(label_index) {
    error_labels[label_index].textContent = ''; // Clear error messages
}

/**
 * Clears all error messages from each label in the `error_labels` array.
 * 1. Iterates through each element in the `error_labels` array.
 * 2. Calls `clear_error_label(i)` for each index `i` to remove any displayed error message in all labels.
 */
function clear_all_error_labels() {
    for (let i = 0; i < error_labels.length; i++) {
        clear_error_label(i);
    }
}

/**
 * Highlights an input element as invalid by adding a specific CSS class.
 * 1. Retrieves the input element at the specified `input_index` from the `inputs` array.
 * 2. Adds the CSS class `invalid-input` to the input element, which applies a visual style to indicate invalid input.
 */
function highlight_invalid_input(input_index) {
    // Get the input element by its index
    input = inputs[input_index];

    // Add the invalid-input class to highlight
    input.classList.add('invalid-input');
}

/**
 * Resets the styling of an input element to its default state, removing any validation highlights.
 * 1. Accesses the input element at the specified `input_index` in the `inputs` array.
 * 2. Removes the `invalid-input` class to clear any invalid styling.
 * 3. Removes the `valid-input` class to clear any valid styling.
 * 4. Clears any inline styles applied to the input element, restoring its original appearance.
 */
function reset_input_highlight(input_index) {
    inputs[input_index].classList.remove('invalid-input'); // Remove the invalid highlight
    inputs[input_index].classList.remove('valid-input');   // Remove the valid highlight
    inputs[input_index].style = '';                        // Clear any inline styles                     

}

/**
 * Resets the styling of all input elements to their default state by clearing any validation highlights.
 * 1. Iterates through each input element in the `inputs` array.
 * 2. Calls `reset_input_highlight(i)` for each index `i` to remove any applied styling, both valid and invalid, from all inputs.
 */
function reset_all_inputs_highlight() {
    for (let i = 0; i < inputs.length; i++) {
        reset_input_highlight(i);
    }
}

/**
 * Highlights an input element as valid by adding a specific CSS class.
 * Workflow:
 * 1. Retrieves the input element at the specified `input_index` from the `inputs` array.
 * 2. Adds the CSS class `valid-input` to the input element, which applies a visual style to indicate valid input.
 */
function highlight_valid_input(input_index) {
    // Get the input element by its index
    input = inputs[input_index];

    // Add the valid-input class to highlight
    input.classList.add('valid-input');
}


/**
 * Clears the text content of a specified input element.
 * 1. Accesses the input element at the specified `input_index` in the `inputs` array.
 * 2. Sets the `value` of the input element to an empty string, effectively clearing any existing text.
 */
function clear_input_text(input_index) {
    inputs[input_index].value = "";
}

/**
 * Clears the text content of all input elements in the `inputs` array.
 * 1. Iterates through each input element in the `inputs` array.
 * 2. Calls `clear_input_text(i)` for each index `i` to set the value of each input to an empty string, effectively clearing all text from each input.
 */
function clear_all_inputs_text() {
    for (let i = 0; i < inputs.length; i++) {
        clear_input_text(i);
    }
}

/**
 * Event listener for the `generate_btn` click event, triggering input validation, table generation, and display.
 * 1. Logs a message to the console indicating the button was clicked.
 * 2. Calls `validate_inputs()` to check if all inputs are valid:
 *    - If validation passes (`all_inputs_are_valid` is `true`):
 *      - Logs a message indicating the table generation will proceed.
 *      - Resets any input highlights by calling `reset_all_inputs_highlight()`.
 *      - Creates a `Multiplication_Table` object using parsed integer values from specified input fields for column and row ranges.
 *      - Uses `HTML_DISPLAY.display_content()` to insert the generated table HTML into the container with ID `container-table`.
 *    - If validation fails, no table generation occurs, as not all inputs are valid.
 */
generate_btn.addEventListener("click", function () {
    console.log("Button clicked!");
    let all_inputs_are_valid = validate_inputs();
    if (all_inputs_are_valid) {
        console.log("generate table now")

        //reset highlights from all the input fields;
        reset_all_inputs_highlight();

        //create an object 
        let mul_table = new Multiplication_Table(
            Number.parseInt(inputs[CONSTANTS.MIN_COLUMN_INPUT_INDEX].value.trim()),
            Number.parseInt(inputs[CONSTANTS.MAX_COLUMN_INPUT_INDEX].value.trim()),
            Number.parseInt(inputs[CONSTANTS.MIN_ROW_INPUT_INDEX].value.trim()),
            Number.parseInt(inputs[CONSTANTS.MAX_ROW_INPUT_INDEX].value.trim()));

        //display table    
        HTML_DISPLAY.display_content(document.getElementById("container-table"), HTML_DISPLAY.construct_table(mul_table.get_matrix()));
    }
    else {
        //cannot generate table because not all the inputs are valid;
    }

});

/**
* Event listener for the `reset_btn` click event, which resets the form by clearing inputs, highlights, and error labels.
* 1. Calls `reset_all_inputs_highlight()` to remove any red or green highlights from input fields.
* 2. Calls `clear_all_inputs_text()` to clear the text from all input fields.
* 3. Calls `clear_all_error_labels()` to remove any displayed error messages.
*/
reset_btn.addEventListener("click", function () {
    //remove any green or red highlights
    reset_all_inputs_highlight();

    // clear all the inputs
    clear_all_inputs_text();

    //remove all error labels
    clear_all_error_labels();
})




// Sources :
// https://www.w3schools.com/js/
// https://www.youtube.com/watch?v=EerdGm-ehJQ

