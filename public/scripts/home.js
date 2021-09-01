/* eslint-disable no-alert */
const token = document.querySelector('._token').value;
const homeAction = document.querySelector('.home__actions');
const modalAction = document.querySelector('.modal__actions');
const taskContainer = document.querySelector('.task-list');

const dbErrorHandler = () => {
    alert('Проблемы с доступом к бд, пожалуйста, попробуйте позже');
};

const renderTask = async () => {
    try {
        let response = await fetch(`/api/user/${token}/tasks`);
        response = await response.json();

        taskContainer.innerHTML = response.reduce((html, task) => {
            return html + `
                <li class="task-list__task task">
                    <p class="task__value">${task.value}</p>
                    <button class="task__remove">
                        <span class="icons icons--remove"></span>
                    </button>
                </li>
            `;
        }, '');
    } catch {
        dbErrorHandler();
    }
};

const addEvenToRemoveBtns = btns => {
    btns.forEach((btn, i) => {
        // eslint-disable-next-line no-param-reassign
        btn.onclick = async () => {
            try {
                await fetch(
                    `/api/user/${token}/delete/${i}`,
                    { method: 'DELETE' }
                );

                await renderTask();
                addEvenToRemoveBtns(document.querySelectorAll('.task__remove'));
            } catch {
                dbErrorHandler();
            }
        };
    });
};

homeAction.addEventListener('click', e => {
    if (e.target.classList.contains('home__btn--new-task')) {
        document.body.classList.add('modal-show');
    }

    if (e.target.classList.contains('home__btn--logout')) {
        // redirection
        document.location.href = document.location.origin;
    }
});

modalAction.addEventListener('click', async e => {
    if (e.target.classList.contains('modal__btn--save')) {
        try {
            const { value } = document.querySelector('.modal__input-value-task');

            await fetch(`/api/user/${token}/new-task`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ value })
            });

            await renderTask();

            document.body.classList.remove('modal-show');
            addEvenToRemoveBtns(document.querySelectorAll('.task__remove'));
        } catch {
            dbErrorHandler();
        }
    }

    if (e.target.classList.contains('modal__btn--close')) {
        document.body.classList.remove('modal-show');
    }
});

window.onload = async () => {
    await renderTask();
    addEvenToRemoveBtns(document.querySelectorAll('.task__remove'));
};
