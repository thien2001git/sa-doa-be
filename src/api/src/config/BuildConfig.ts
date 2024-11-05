const CONNECTION_STRING =
    'mongodb+srv://hoangthien66771508:1B1oxqEpXUW8D46c@cluster0.kkntl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const PAGINATE_OPTIONS = {
    limit: 10,
    page: 1,
    offset: 0,
    total: 0,
};

export { PAGINATE_OPTIONS };

const BuildConfig = {
    CONNECTION_STRING,
    PAGINATE_OPTIONS,
};

export default BuildConfig;
