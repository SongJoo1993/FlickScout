import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import {Form, Row, Col, Button} from 'react-bootstrap'
import {rated, categories, language, country, ranges} from '../public/searchItem';
import { useState } from "react";

export default function addMovie() {
  const [isDisabled,setIsDisabled] = useState(false);
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
      awards: "",
      plot: "",
    },
  });
  //languages, countries, fromDate(release date), 
  function submitForm(data) {
    try {
      console.log(data);
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
      style={{textAlign: "left"}}
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
              type="text" 
            />
          </Form.Group>
        </Row>
        {/* <Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Row> */}
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Genre</Form.Label>
            <Controller
              control={control}
              defaultValue={categories[0].value}
              name="genre"
              render={({ field: { onChange, value, ref }}) => (
                <Select
                  inputRef={ref}
                  value={categories.filter(c => value.includes(c.value))}
                  onChange={val => {onChange(val.map(c => c.value))}}
                  options={categories}
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
          {/* <Form.Group as={Col}>
            <Form.Label>Motion Picture Rating (MPAA):</Form.Label>
            <Select 
              {...register("rated")}
              options={options} 
            />
            <Form.Select
              {...register("rated")}
              className="mb-1" 
              type="text" 
              >
                {rated.map((elm,index) => 
                  <option key={index}>
                    {elm}
                  </option>
                  )}
              </Form.Select>
          </Form.Group> */}
        </Row>


        <Form.Label>IMDb Rating</Form.Label>
        <Form.Control
          {...register("imdb")}
          className="mb-1" 
          type="text" 
          />
        <Form.Label>Awards</Form.Label>
        <Form.Control
          {...register("awards")}
          className="mb-1" 
          type="text" 
          />
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
  