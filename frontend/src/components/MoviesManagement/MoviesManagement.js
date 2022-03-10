import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../service/ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { SelectButton } from 'primereact/selectbutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import '../../styles/MoviesTable.css';

const MoviesTable = () => {

    let emptyMovie = {
        title: '',
        year: 0,
        director: '',
        genre: null,
        description: '',
        poster: '',
        length: '',
        stars: null
    };

    const [movies, setMovies] = useState(null);
    const [movieDialog, setMovieDialog] = useState(false);
    const [deleteMovieDialog, setDeleteMovieDialog] = useState(false);
    const [deleteMoviesDialog, setDeleteMoviesDialog] = useState(false);
    const [movie, setMovie] = useState(emptyMovie);
    const [selectedMovies, setSelectedMovies] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const productService = new ProductService();

    useEffect(() => {
        productService.getProducts().then(data => setMovies(data));
    }, []);

    const openNew = () => {
        setMovie(emptyMovie);
        setSubmitted(false);
        setMovieDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setMovieDialog(false);
    }

    const hideDeleteMovieDialog = () => {
        setDeleteMovieDialog(false);
    }

    const hideDeleteMoviesDialog = () => {
        setDeleteMoviesDialog(false);
    }

    const saveMovie = () => {

        setSubmitted(true);

        let _movies = [...movies];
        let _movie = { ...movie };

        _movies.push(_movie);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Movie Saved', life: 3000 });

        setMovies(_movies);
        setMovieDialog(false);
        setMovie(emptyMovie);
    }

    const deleteMovie = () => {
        let _movies = movies.filter(val => val.id !== movie.id);
        setMovies(_movies);
        setDeleteMovieDialog(false);
        setMovie(emptyMovie);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Movie Deleted', life: 3000 });
    }


    const confirmDeleteSelected = () => {
        setDeleteMoviesDialog(true);
    }

    const deleteSelectedMovies = () => {
        let _movies = movies.filter(val => !selectedMovies.includes(val));
        setMovies(_movies);
        setDeleteMoviesDialog(false);
        setSelectedMovies(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Movies Deleted', life: 3000 });
    }

    const ongenreChange = (e) => {
        let _movie = { ...movie };
        _movie['genre'] = e.value;
        setMovie(_movie);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _movie = { ...movie };
        _movie[`${name}`] = val;

        setMovie(_movie);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _movie = { ...movie };
        _movie[`${name}`] = val;

        setMovie(_movie);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedMovies || !selectedMovies.length} />
            </React.Fragment>
        )
    }

    const imageBodyTemplate = (rowData) => {
        return <img src={`images/product/${rowData.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="poster" />
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Movies in the collection</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const movieDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveMovie} />
        </React.Fragment>
    );
    const deleteMovieDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteMovieDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteMovie} />
        </React.Fragment>
    );
    const deleteMoviesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteMoviesDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedMovies} />
        </React.Fragment>
    );

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={movies} selection={selectedMovies} onSelectionChange={(e) => setSelectedMovies(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} movies"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column field="title" header="Title" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="year" header="Year" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="director" header="Director" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="poster" header="Poster" body={imageBodyTemplate}></Column>
                    <Column field="lenght" header="Lenght" sortable style={{ minWidth: '10rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={movieDialog} style={{ width: '450px' }} header="Movies Details" modal className="p-fluid" footer={movieDialogFooter} onHide={hideDialog}>
                {movie.image && <img src={`images/product/${movie.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={movie.image} className="poster block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name">Title</label>
                    <InputText id="name" value={movie.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !movie.name })} />
                    {submitted && !movie.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" value={movie.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>

                <div className="field">
                    <label className="mb-3">Genres</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <SelectButton inputId="genre1" name="genre" value="Drama" onChange={ongenreChange} checked={movie.genre === 'Drama'} />
                            <label htmlFor="genre1">Drama</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <SelectButton inputId="genre2" name="genre" value="Comedy" onChange={ongenreChange} checked={movie.genre === 'Comedy'} />
                            <label htmlFor="genre2">Comedy</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <SelectButton inputId="genre3" name="genre" value="Action" onChange={ongenreChange} checked={movie.genre === 'Action'} />
                            <label htmlFor="genre3">Action</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <SelectButton inputId="genre4" name="genre" value="Animation" onChange={ongenreChange} checked={movie.genre === 'Animation'} />
                            <label htmlFor="genre4">Animation</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <SelectButton inputId="genre5" name="genre" value="Fantasy" onChange={ongenreChange} checked={movie.genre === 'Fantasy'} />
                            <label htmlFor="genre5">Fantasy</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <SelectButton inputId="genre6" name="genre" value="Adventure" onChange={ongenreChange} checked={movie.genre === 'Adventure'} />
                            <label htmlFor="genre6">Adventure</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <SelectButton inputId="genre7" name="genre" value="Crime" onChange={ongenreChange} checked={movie.genre === 'Crime'} />
                            <label htmlFor="genre7">Crime</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <SelectButton inputId="genre8" name="genre" value="Romance" onChange={ongenreChange} checked={movie.genre === 'Romance'} />
                            <label htmlFor="genre8">Romance</label>
                        </div>
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="director">Director</label>
                        <InputTextarea id="director" value={movie.director} onChange={(e) => onInputChange(e, 'director')} />
                    </div>
                    <div className="field col">
                        <label htmlFor="year">Year</label>
                        <InputNumber id="year" value={movie.year} onValueChange={(e) => onInputNumberChange(e, 'year')} integeronly />
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteMovieDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteMovieDialogFooter} onHide={hideDeleteMovieDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {movie && <span>Are you sure you want to delete <b>{movie.name}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteMoviesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteMoviesDialogFooter} onHide={hideDeleteMoviesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {movie && <span>Are you sure you want to delete the selected movies?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default MoviesTable;
