<script>
  import {
    Navbar,
    NavBrand,
    NavHamburger,
    NavUl,
    NavLi,
    Button,
    Input,
    Textarea,
    Modal,
  } from "flowbite-svelte";
  import { HandThumbDown, HandThumbUp } from "svelte-heros";
  import truncateEthAddress from "truncate-eth-address";

  import {
    formatTimestamp,
    transferDiamondTokens,
    transferHistoryDetails,
  } from "../utils/utils";

  export let isWalletInstalled, connectWallet, loading, account;

  let truncatedAccount = account === null ? null : truncateEthAddress(account);

  let defaultModal = false;

  let historyModal = false;

  let loadingHistory = true;

  let transactionHistory = [];

  // set amount
  let amount = null;

  // set receiver
  let _receiver = "";

  // set receiver
  let loadingTransaction = false;

  // transferToken
  function transferDiamond() {
    if (_receiver === "" || _receiver === undefined || _receiver === null) {
      alert("Please Enter Recipient Address");
    }
    if (amount === 0 || amount === null) {
      alert("Please Enter Amount of Tokens greater than 0");
    }
    const values = {
      _receiver,
      amount,
    };
    transferDiamondTokens(values, loadingTransaction);
  }

  // transaction history
  const getHistory = async () => {
    historyModal = true;
    const result = await transferHistoryDetails();
    console.log(result);
    transactionHistory = result;
    loadingHistory = false;
  };

  // hide modal
  function hideModal() {
    defaultModal = false;
    _receiver = "";
    amount = null;
  }

  // hide history modal
  function hideHistoryModal() {
    historyModal = false;
  }

  let navClass =
    "bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800";
  let navDivClass =
    "flex flex-wrap justify-between items-center mx-auto max-w-screen-xl";
</script>

<header>
  <Navbar let:hidden let:toggle fluid={false} {navClass} {navDivClass}>
    <NavBrand href="/">
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        class="mr-1 sm:mr-3 h-6 sm:h-9"
        alt="Flowbite Logo"
      />
      <span
        class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >
        DiamondLabs
      </span>
    </NavBrand>

    {#if isWalletInstalled}
      <div class="flex items-center lg:order-2">
        {#if isWalletInstalled && truncatedAccount === null}
          <button on:click={connectWallet} color="dark">
            Connect Wallet
          </button>
        {:else}
          <button on:click={connectWallet} color="dark">
            {truncatedAccount}
          </button>
        {/if}
        <NavHamburger
          on:click={toggle}
          btnClass="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        />
      </div>
    {:else}
      <div class="flex items-center lg:order-2">
        <a
          href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
        >
          <button color="dark">Install Wallet</button>
        </a>
        <NavHamburger
          on:click={toggle}
          btnClass="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        />
      </div>
    {/if}

    <NavUl
      {hidden}
      divClass="justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
      ulClass="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0"
    >
      <p
        on:click={() => (defaultModal = true)}
        class="hover:cursor-pointer hover:underline"
      >
        Transfer
      </p>
      <p on:click={getHistory} class="hover:cursor-pointer hover:underline">
        History
      </p>
      <NavLi href="/">Approve 3rd Party Agent</NavLi>
      <NavLi href="/">3rd Parties</NavLi>
    </NavUl>
  </Navbar>

  <!-- show transfer modal -->
  <Modal title="" bind:open={defaultModal} size="md">
    <div class="flex justify-between mb-4 rounded-t sm:mb-5">
      <div class="text-lg text-gray-900 md:text-xl dark:text-white">
        <h3 class="font-semibold ">Transfer Diamond Tokens</h3>
      </div>
    </div>
    <div>
      <Input
        placeholder={`Reciever's Wallet Address`}
        bind:value={_receiver}
        class="mb-2"
      />
      <Input placeholder={`Tokens Amount`} type="number" bind:value={amount} />
    </div>
    <div class="flex justify-between items-center gap-3">
      <div
        class="flex items-center space-x-3 sm:space-x-4"
        on:click={transferDiamond}
      >
        <Button>
          <HandThumbUp class="pr-2" />

          {#if !loadingTransaction}
            Transfer
          {:else}
            Transferring
          {/if}
        </Button>
      </div>

      <div
        class="flex items-center space-x-3 sm:space-x-4"
        on:click={hideModal}
      >
        <Button color="red">
          <HandThumbDown class="pr-2" />
          Cancel
        </Button>
      </div>
    </div>
  </Modal>

  <!-- show transfer history -->
  <Modal title="" bind:open={historyModal} size="md">
    <div class="flex justify-between mb-4 rounded-t sm:mb-5">
      <div class="text-lg text-gray-900 md:text-xl dark:text-white">
        <h3 class="font-semibold ">Transaction History</h3>
      </div>
    </div>
    {#if transactionHistory.length > 0 && !loadingHistory}
      <table class="table-auto border rounded-md p-2">
        <thead class="p-2">
          <tr class="border">
            <th class="border p-1"> address </th>
            <th class="border p-1"> amount </th>
            <th class="border p-1"> date </th>
          </tr>
        </thead>
        <tbody class="p-2">
          {#each transactionHistory as { _to, amount, time }, i}
            <tr class="border">
              <td class="border">
                {truncateEthAddress(_to)}
              </td>
              <td class="border">
                {amount}DND
              </td>
              <td class="border">
                {formatTimestamp(time)}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
    {#if loadingHistory}
      <span>Loading Data</span>
    {/if}
    {#if !loadingHistory && transactionHistory.length == 0}
      <span>No Transaction History</span>
    {/if}
    <div />
    <div class="flex justify-between items-center gap-3">
      <div
        class="flex items-center space-x-3 sm:space-x-4"
        on:click={hideHistoryModal}
      >
        <Button color="red">
          <HandThumbDown class="pr-2" />
          Close
        </Button>
      </div>
    </div></Modal
  >
</header>
