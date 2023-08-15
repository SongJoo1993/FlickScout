import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import {Form, Row, Col, Button} from 'react-bootstrap'
import {rated, categoriesObj, language, country, ranges} from '../public/searchItem';
import { useState } from "react";

export default function AddMovie() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      directors: "",
      cast: "",
      runTime: 0,
      genre: [],
      rated: "",
      imdb: "",
      released: "",
      plot: "",
    },
  });
  //languages, countries, fromDate(release date), 
  function submitForm(data) {
    try {
      console.log(data);
      // OBJ : released, 
      // if(updateMovie(_id, data)) {
      //   console.log(props)
      //   props.saveEdit();
      // }
    }
    catch(err) {
      // return (
      //   <>
      //     <Alert variant="danger" onClose={() => router.push("/")} dismissible>
      //       <Alert.Heading> Edit Failed! Please try again.</Alert.Heading>
      //     </Alert>
      //   </>
      // );
    }
  }

  return (
    <div style={{maxWidth: "50%", maxHeight: "50%", margin: "0 auto"}}>
      <Form 
      style={{textAlign: "left", marginTop: "2rem"}}
      onSubmit={handleSubmit(submitForm)}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Title</Form.Label>
            <Form.Control 
                {...register("title")}
                className="mb-1"
                type="text" 
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Director</Form.Label>
            <Form.Control 
                {...register("directors")}
                className="mb-1"
                type="text" 
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Cast</Form.Label>
            <Form.Control
              {...register("cast")}
              className="mb-1"
              type="text" 
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Run Time (in minutes)</Form.Label>
            <Form.Control
              {...register("runTime")}
              className="mb-1"
              type="number" 
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Genre</Form.Label>
            <Controller
              control={control}
              defaultValue={categoriesObj[0].value}
              name="genre"
              render={({ field: { onChange, value, ref }}) => (
                <Select
                  inputRef={ref}
                  value={categoriesObj.filter(c => value.includes(c.value))}
                  onChange={val => {onChange(val.map(c => c.value))}}
                  options={categoriesObj}
                  isMulti
                  // isDisabled={isDisabled}
                />
              )}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Motion Picture Rating (MPAA)</Form.Label>
            <Controller
              control={control}
              defaultValue={rated.map(c => c.value)}
              name="rated"
              render={({ field: { onChange, value, ref }}) => (
                <Select
                  inputRef={ref}
                  value={rated.filter(c => value.includes(c.value))}
                  onChange={val => onChange(val.value)}
                  options={rated}
                />
              )}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>IMDb Rating</Form.Label>
            <Form.Control
              {...register("imdb")}
              className="mb-1" 
              type="number" 
              />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Release Date</Form.Label>
            <Form.Control
              {...register("released")}
              className="mb-1" 
              type="date" 
              />
          </Form.Group>
        </Row>

        <Form.Label>Plot</Form.Label>
        <Form.Control
          {...register("plot")}
          className="mb-1" 
          as="textarea" 
          />
      </Form.Group>
      <Button variant="primary" type="submit">Save</Button>
    </Form>
    </div >
      )
  }
  