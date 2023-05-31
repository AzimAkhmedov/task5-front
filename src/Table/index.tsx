import { Sheet, Table } from "@mui/joy";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";

import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getMoreUsers, getTenUsers } from "../store/reducer";
import "./index.scss";

const TablePage = () => {
  const { loader, users, error } = useAppSelector((state) => state.users);
  const [reg, setRegion] = useState<"Uzb" | "Usa" | "Rus">("Uzb");
  const [seed, setSeed] = useState<number>(0);
  const [misspells, setMissples] = useState<number>(0);
  const dispatch = useAppDispatch();
  const handleChange = (event: SelectChangeEvent) => {
    let choose = event.target.value as "Uzb" | "Usa" | "Rus";
    setRegion(choose);
    dispatch(getTenUsers({ seed, reg: choose, err: misspells }));
  };
  const listInnerRef = useRef();
  const handleScroll = (e: any) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 1;
    if (bottom) {
      console.log("bottom");
      dispatch(getMoreUsers({ seed: seed + 1, reg, err: misspells }));
      setSeed(seed + 1);
    }
  };

  useEffect(() => {
    dispatch(getTenUsers({ seed, reg, err: misspells }));
  }, []);
  return loader ? (
    <>Загрузка</>
  ) : error ? (
    <>Ошибка! {error}</>
  ) : (
    <div
      onScroll={handleScroll}
      style={{ overflowY: "scroll", maxHeight: "100vh" }}
    >
      <Sheet className={"root"} color="info" variant="soft">
        <div className="header">
          <div className="input">
            <input
              value={seed}
              onChange={(e) => {
                setSeed(Number(e.target.value));
                dispatch(
                  getTenUsers({
                    seed: Number(e.target.value),
                    reg,
                    err: misspells,
                  })
                );
              }}
              type="number"
              placeholder="Type your seed"
              name=""
              id=""
            />
            <button
              onClick={() => {
                let random = Math.floor(Math.random() * 1000);
                setSeed(random);
                dispatch(getTenUsers({ seed: random, reg, err: misspells }));
              }}
            >
              Generate Random seed
            </button>
          </div>
          <div>
            <h3>Pick Region</h3>
            <Select value={reg} onChange={handleChange} label="Age">
              <MenuItem value={"Uzb"}>Uzb</MenuItem>
              <MenuItem value={"Usa"}>Usa</MenuItem>
              <MenuItem value={"Rus"}>Rus</MenuItem>
            </Select>
          </div>
          <div className="slider">
            <Slider
              size="small"
              defaultValue={misspells}
              value={misspells}
              step={0.25}
              onChange={(e: any) => {
                setMissples(Number(e.target.value));
                console.log(e.target.value);
                dispatch(
                  getTenUsers({
                    seed,
                    reg,
                    err: Number(e.target.value),
                  })
                );
              }}
              aria-label="Small"
              valueLabelDisplay="auto"
              max={1000}
            />{" "}
            <span>Кол-во Ошибок в каждом пользователе</span>
          </div>
        </div>

        <Table
          size={"lg"}
          color="info"
          variant="outlined"
          stickyHeader
          aria-label="sticky table"
          className="table"

          // ref={listInnerRef}
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Identificator</th>
              <th>Username</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ address, id, email, fullname, number }, i) => (
              <tr key={id}>
                <th>{i + 1}</th>
                <th>{id}</th>
                <th>{fullname}</th>
                <th>{address}</th>
                <th>{number}</th>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </div>
  );
};

export default TablePage;
