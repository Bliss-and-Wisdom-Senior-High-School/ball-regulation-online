import { useState, useEffect, Fragment } from 'react';
import  TextField  from "@mui/material/TextField";
import  Autocomplete  from "@mui/material/Autocomplete";
import CircularProgress from '@mui/material/CircularProgress';

function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  const InputClass = () => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;
  
    useEffect(() => {
      let active = true;

      if (!loading) {
        return undefined;
      }
  
      (async () => {
        await sleep(1e1); // For demo purposes.
  
        if (active) {
          setOptions([...classname]);
        }
      })();
  
      return () => {
        active = false;
      };
    }, [loading]);
  
    useEffect(() => {
      if (!open) {
        setOptions([]);
      }
    }, [open]);
  
    return (
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: '100%',fontSize: '20px' }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        getOptionLabel={(option) => option.name || ""}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="班級"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
          />
        )}
      />
    );
  }
  

  export default InputClass;
  // class name in B&W
  const classname = [
    { name: '高三忠', year: 1994 },
    { name: '高三孝', year: 1972 },
    { name: '高二忠', year: 1974 },
    { name: '高二孝', year: 2008 },
    { name: '高一忠', year: 1957 },
    { name: '高一孝', year: 1993 },
    { name: '國三忠', year: 1994 },
    { name: '國三孝', year: 2003},
    { name: '國二忠', year: 1966 },
    { name: '國二孝', year: 1999 },
    { name: '國一忠', year: 2001},
    { name: '國一孝', year: 1980},
  ];