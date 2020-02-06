
/*
 * This function is called when the modal dialogue for dialect tests is submitted.
 */
function dialectTestFormSubmit(event) {
    if (event) {
        event.preventDefault();
    }
    // get the DOM element for the <textarea> for the comment
    let commentTextArea = document.getElementById('new_comment_field');

    // collect all selected dialects from the select input
    let dialectSelectInput = document.getElementById('dialect-name-text');
    let selectedDialects = [...dialectSelectInput.options].filter(option => option.selected).map(option => option.value)
    // if 'all' is any of the select dialects than don't use the special syntax to list it out
    commentTextArea.value += `CI:DIALECTS` + (selectedDialects.includes("all") ? "" : `[${selectedDialects.join(' ')}]`) + "\n"

    let dialectTestFilename = document.getElementById('dialect-test-name').value.trim();
    let dialectTestRegex = document.getElementById('dialect-test-regex').value.trim();

    if (dialectTestFilename.length != 0) {
        commentTextArea.value += `CI:DIALECT_TEST[TEST=${dialectTestFilename} FILTER=/${dialectTestRegex}/]` + "\n"
    }

    closeDialectModalDialog();

    makeCommentButtonClickable();
}

/*
 * GitHub uses CSS Pure https://purecss.io/
 * The modal dialog is built using https://github.com/github/details-dialog-element
 * You "should" be able to hide it simply by calling 'toggle' however it does not seem to work.
 * This just ends up doing the same code as toggle.
 */
function closeDialectModalDialog() {
    let dialectModalDialog = document.getElementById('dialect-modal-dialog');
    dialectModalDialog.removeAttribute('open');
}

function makeCommentButtonClickable() {
    let commentButton = Array.from(document.querySelectorAll('button'))
                             .find(el => el.textContent.trim() === 'Comment');
    commentButton.removeAttribute('disabled');
}

const url = chrome.runtime.getURL('dialect.html');
fetch(url)
    .then( (response) => response.text())
    .then((html) => {
        // include the HTML on the comment form
        const commentFormActions = document.getElementById('partial-new-comment-form-actions');
        const innerDivs = commentFormActions.getElementsByTagName('div');
        innerDivs[0].insertAdjacentHTML('beforeend', html);

        // register the click button for the comment to close the modal dialogue
        document.getElementById("dialect-button-comment").addEventListener("click", dialectTestFormSubmit);
    });