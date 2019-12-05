<template>
    <div>
        <ul>
            <li>
                <div><b>Why the custom uuid implementation have used?</b></div>
                <div>Because the task conditions limited library usage to vue, vue-router and vuex</div>
            </li> 
            <li>
                <div><b>Why the vuex have not been used?</b></div>
                <div>There is no requirement in state management in a context of this task. In case the task would be extended - there would be no problem to add the satate management (vuex) into the code</div>
            </li> 
            <li>
                <div><b>Do we have ability to face any problems of not-purging operationsPull in the tasks #2?</b></div>
                <div>Yes, we potentialy have. But only in case of huge amount of comments. If so, we would easely fix it using periodical/conditional purging</div>
            </li> 
            <li>
                <div><b>How we can check that sections load separetly (lazy)?</b></div>
                <div>console.log inside mounted() of Task1.vue and Task2.vue</div>
            </li> 
        </ul>
    </div>
</template>