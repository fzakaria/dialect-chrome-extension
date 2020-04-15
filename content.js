class CICommandProducer {
    /**
     *
     * @param {Array.<string>} [connections] optional list of connections (e,g. `[denodo, exasol]`)
     * @param testFile {string} optional test file to run (e.g. `test/unit/blah.js`)
     * @param testRegexFilter {string} optional regex to limit tests that are run (e.g. `cool test foo`)
     */
    constructor(connections, testFile, testRegexFilter) {
        this.connections = connections;
        this.testFile = testFile;
        this.testRegexFilter = testRegexFilter;
    }

    emitCommand() {
        let cmd;
        if (!this.connections || this.connections.length === 0) {
            cmd = "CI:DIALECTS[";
        } else {
            cmd = "CI:DIALECT_TEST[(";
            cmd += this.connections.join(" ");
            cmd += ") ";
        }

        cmd += `TEST=\'${this.testFile}\' `;
        cmd += `FILTER=/${this.testRegexFilter}/`;
        cmd += ']';
        return cmd;
    }
}

class PageRepresentation {
    constructor() {}

    get selectedDialects() {
        let dialectSelectInput = document.getElementById("dialect-name-text");
        let selectedDialects = [...dialectSelectInput.options]
            .filter(option => option.selected)
            .map(option => option.value);

        if (
            selectedDialects &&
            selectedDialects.length === 1 &&
            selectedDialects[0] === "all"
        ) {
            selectedDialects = [];
        }

        return selectedDialects;
    }

    get dialectTestFilename() {
        return document
            .getElementById("dialect-test-name")
            .value.trim();
    }

    get dialectTestRegex() {
        return document
            .getElementById("dialect-test-regex")
            .value.trim();
    }

    setComment(val) {
        // get the DOM element for the <textarea> for the comment
        let commentTextArea = document.getElementById("new_comment_field");
        commentTextArea.value = val;
    }
}

/*
 * This function is called when the modal dialogue for dialect tests is submitted.
 */
function dialectTestFormSubmit(event) {
    if (event) {
        event.preventDefault();
    }

    let pageRepresentation = new PageRepresentation();

    let command = new CICommandProducer(
        pageRepresentation.selectedDialects,
        pageRepresentation.dialectTestFilename,
        pageRepresentation.dialectTestRegex
    ).emitCommand();

    pageRepresentation.setComment(command);

    closeDialectModalDialog();

    makeCommentButtonClickable();
}

/*
 * GitHub uses CSS Primer Library https://primer.style/css/
 * The modal dialog is built using https://github.com/github/details-dialog-element
 * You "should" be able to hide it simply by calling 'toggle' however it does not seem to work.
 * This just ends up doing the same code as toggle.
 */
function closeDialectModalDialog() {
    let dialectModalDialog = document.getElementById("dialect-modal-dialog");
    dialectModalDialog.removeAttribute("open");
}

function makeCommentButtonClickable() {
    let commentButton = Array.from(document.querySelectorAll("button")).find(
        el => el.textContent.trim() === "Comment"
    );
    commentButton.removeAttribute("disabled");
}

const url = chrome.runtime.getURL("dialect.html");
fetch(url)
    .then(response => response.text())
    .then(html => {
        // include the HTML on the comment form
        const commentFormActions = document.getElementById(
            "partial-new-comment-form-actions"
        );
        const innerDivs = commentFormActions.getElementsByTagName("div");
        innerDivs[0].insertAdjacentHTML("beforeend", html);

        // register the click button for the comment to close the modal dialogue
        document
            .getElementById("dialect-button-comment")
            .addEventListener("click", dialectTestFormSubmit);
    });
