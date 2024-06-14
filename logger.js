export default function logger(reducer) {
    return (action, prevState, args) => {

        console.group(action);
        console.log('Prev State: ', prevState);
        console.log('Action Argurment: ', args);

        const nextState = reducer(action, prevState, args)

        console.log('Next State: ', nextState);
        console.groupEnd();

        return nextState;
    }
}