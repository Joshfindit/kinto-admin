import { expect } from "chai";

import session from "../../src/reducers/session";
import {
  SESSION_BUSY,
  SESSION_SETUP_COMPLETE,
  SESSION_SERVERINFO_SUCCESS,
  SESSION_AUTHENTICATED,
  SESSION_BUCKETS_SUCCESS,
  SESSION_LOGOUT,
} from "../../src/constants";


describe("session reducer", () => {
  it("SESSION_BUSY", () => {
    expect(session(undefined, {
      type: SESSION_BUSY,
      busy: true,
    })).to.have.property("busy").eql(true);
  });

  it("SESSION_SETUP_COMPLETE", () => {
    const setup = {
      server: "http://test",
      authType: "basicauth",
      credentials: {
        username: "user",
        password: "pass"
      }
    };

    expect(session(undefined, {
      type: SESSION_SETUP_COMPLETE,
      session: setup
    })).eql({
      busy: false,
      authenticated: false,
      server: setup.server,
      authType: setup.authType,
      credentials: setup.credentials,
      buckets: [],
      redirectURL: null,
      serverInfo: {
        capabilities: {},
        user: {},
      },
    });
  });

  it("SESSION_SERVERINFO_SUCCESS", () => {
    const serverInfo = {
      capabilities: {
        attachments: {},
      },
      user: {
        bucket: "foo"
      }
    };

    const state = session(undefined, {
      type: SESSION_SERVERINFO_SUCCESS,
      serverInfo
    });

    expect(state).to.have.property("serverInfo").eql(serverInfo);
  });

  it("SESSION_BUCKETS_SUCCESS", () => {
    const buckets = [];

    const state = session(undefined, {
      type: SESSION_BUCKETS_SUCCESS,
      buckets
    });

    expect(state).to.have.property("buckets").eql(buckets);
  });

  it("SESSION_AUTHENTICATED", () => {
    const state = session({authenticated: false}, {
      type: SESSION_AUTHENTICATED,
    });

    expect(state).to.have.property("authenticated").eql(true);
  });

  it("SESSION_LOGOUT", () => {
    const state = {authenticated: true};

    expect(session(state, {
      type: SESSION_LOGOUT,
    })).to.have.property("authenticated").eql(false);
  });

});
