<script>
  import Body from "./lib/Body.svelte";
  import Header from "./lib/Header.svelte";

  import { onMount } from "svelte";

  import { persist, createLocalStorage } from "@macfja/svelte-persistent-store";
  import { writable } from "svelte/store";
  import { balanceOwner } from "./utils/utils";

  let account = persist(writable(null), createLocalStorage(), "account");

  let isWalletInstalled = false;
  let loading = false;
  let balance = 0;

  onMount(() => {
    if (window.ethereum) {
      alert("Ethereum support is available");
      isWalletInstalled = true;
    } else {
      alert("Please Installed Metatask");
    }
    (async () => {
      await getBalance();
    })();
  });

  async function getBalance() {
    if ($account !== null || $account !== undefined) {
      balanceOwner($account).then((result) => (balance = result));
    } else {
      balance = 0;
    }
  }

  async function connectWallet() {
    loading = true;
    setTimeout(() => {
      window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => {
          $account = accounts[0];
        })
        .catch((error) => {
          alert("Something went wrong");
        });
      loading = false;
    }, 2000);
  }
</script>

<Header
  account={$account}
  {isWalletInstalled}
  {connectWallet}
  {loading}
  {balance}
/>
<Body />

<style>
</style>
