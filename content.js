

function dialectTestFormSubmit(event) {
    if (event) {
        event.preventDefault();
    }
    // get the DOM element for the <textarea> for the comment
    var commentTextArea = document.getElementById('new_comment_field');
    var dialectSelectInput = document.getElementById('name-text');

    let selectedDialects = [...dialectSelectInput.options].filter(option => option.selected).map(option => option.value)
    commentTextArea.value = `CI:DIALECTS[${selectedDialects.join(' ')}]`
}

var commentFormActions = document.getElementById('partial-new-comment-form-actions');
var innerDivs = commentFormActions.getElementsByTagName('div');

innerDivs[0].insertAdjacentHTML('beforeend',
`
<div class="bg-gray-light ml-1">
    <details class="js-user-status-details details-reset details-overlay details-overlay-dark">
        <summary class="btn btn-primary">Dialect Test</summary>
        <details-dialog class="details-dialog rounded-1 anim-fade-in fast Box Box--overlay">
            <div class="Box-header bg-gray border-bottom p-3">
                <button class="Box-btn-octicon js-toggle-user-status-edit btn-octicon float-right" type="reset" aria-label="Close dialog" data-close-dialog="">
                    <svg class="octicon octicon-x" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path>
                    </svg>
                </button>
                <h3 class="Box-title f5 text-bold text-gray-dark">Start Dialect Integration Test</h3>
                <form id="dialect-test-form">
                    <dl class="form-group">
                        <dt><label for="name-text">Dialect Type</label></dt>
                        <dt>
                            <select multiple name="dialect" id="name-text" class="form-select">
                              <option value="All">All</option>
                              <option value="bigquery">BigQuery Legacy</option>
                              <option value="bigquery_standard_sql">BigQuery Standard SQL</option>
                              <option value="mysql">MySQL</option>
                              <option value="presto">Presto</option>
                            </select>
                        </dt>
                    </dl>

                    <dl class="form-group">
                        <dt>
                            <input type="text" name="test" value="" placeholder="You can specify a specific file..." class="form-control input-monospace" >
                        </dt>
                        <dt>
                            <input type="text" name="filter" value="" placeholder="You can specify a specific test regex filter..." class="form-control input-monospace" >
                        </dt>
                    </dl>

                    <div class="form-actions">
                        <button id="dialect-button-comment" type="input" class="btn btn-primary">Comment</button
                    </div>
                </form>
            </div>
        </details-dialog>
    </details>
</div>
`
);

document.getElementById("dialect-button-comment").addEventListener("click", dialectTestFormSubmit);