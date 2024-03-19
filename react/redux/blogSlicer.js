window.onload = function() {
    const { createSlice, createAsyncThunk } = ReactRedux;

    console.log(ReactRedux)

    const fetchBlogs = createAsyncThunk(`fetchBlogs`, async () => {
        const response = await fetch(`https://mybrand-be-95he.onrender.com/api/blogs`);
        return response.json();
    });

    const blogSlice = createSlice({
        name: 'blog',
        initialState: {
            isLoading: false,
            data: null,
            error: false
        },
        extraReducers: (builder) => {
            builder.addCase(fetchBlogs.pending, (state, action) => {
                state.isLoading = true;
            });
            builder.addCase(fetchBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            });
            builder.addCase(fetchBlogs.rejected, (state, action) => {
                state.error = true;
            });
        }
    });

    window.blogReducer = blogSlice.reducer;
};
