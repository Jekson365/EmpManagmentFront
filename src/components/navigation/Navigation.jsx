import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { navigationParams } from "../../NavigationParams";
import { CurrentUserContext } from "../../App";
import UseLogout from "../../hooks/users/UseLogout";

function Navigation() {
  const { handleLogout } = UseLogout();
  const { page, setPage } = useContext(CurrentUserContext);
  const { user } = useContext(CurrentUserContext);

  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <>
      <Stack
        direction={"column"}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        height={"100%"}
      >
        <Box width={"100%"}>
          <Stack
            direction={"column"}
            alignItems={"flex-start"}
            justifyItems={"space-between"}
          >
            <Box
              display={"flex"}
              ml={1}
              justifyContent={"flex-start"}
              alignItems={"center"}
              width={"100%"}
              borderRadius={"3px"}
              minHeight={"90px"}
            >
              <h1>კომპანია</h1>
            </Box>
            <Stack direction={"column"} mt={3} width={"100%"} gap={"0px"}>
              {navigationParams
                .filter(
                  (d) => !d.needSuperAdmin || user.role.name === "superadmin"
                )
                .map((item) => {
                  return (
                    <>
                      <NavSection key={item.id}>
                        <Stack
                          mt={1}
                          direction={"row"}
                          alignItems={"center"}
                          className={`nav-item ${page.sectionId === item.id ? "active-nav-item" : null}`}
                          justifyContent={"flex-start"}
                        >
                          <Stack
                            direction={"row"}
                            gap={"10px"}
                            alignItems={"center"}
                            pl={1}
                            onClick={() =>
                              setPage({ sectionId: item.id, pageId: 1 })
                            }
                          >
                            {item.icon}
                            <h4
                              className={`color-light ${page.sectionId === item.id ? "active-color-light" : null}`}
                            >
                              {item.sectionName}
                            </h4>
                          </Stack>
                        </Stack>
                        <Stack
                          gap={"10px"}
                          direction={"column"}
                          ml={0.5}
                          mt={1}
                          className="nav-item-container"
                        >
                          {item.items
                            .filter(
                              (k) =>
                                !k.needSuperAdmin ||
                                user.role.name === "superadmin"
                            )
                            .map((i) => {
                              return (
                                <>
                                  <Stack
                                    direction={"row"}
                                    gap={"10px"}
                                    ml={2}
                                    style={{ opacity: "0.8" }}
                                    className="nav-sub-item"
                                    onClick={() =>
                                      setPage({
                                        sectionId: item.id,
                                        pageId: i.id,
                                      })
                                    }
                                  >
                                    {i.icon}
                                    <p
                                      className={`color-light ${page.pageId === i.id && item.id === page.sectionId ? "active-sub-item" : null}`}
                                    >
                                      {i.title}
                                    </p>
                                  </Stack>
                                </>
                              );
                            })}
                        </Stack>
                      </NavSection>
                    </>
                  );
                })}
            </Stack>
          </Stack>
        </Box>
        <Box>
          {user.id ? (
            <>
              <button
                className="log-out"
                variant="contained"
                onClick={handleLogout}
              >
                გასვლა
              </button>
            </>
          ) : null}
        </Box>
      </Stack>
    </>
  );
}

const NavSection = styled.div`
  flex-direction: column;
  align-items: flex-start;
`;

export default Navigation;
